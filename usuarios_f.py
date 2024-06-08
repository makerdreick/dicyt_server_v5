from flask import Blueprint, request, render_template, redirect, url_for, jsonify
import sqlite3
from manager import get_db_connection

usuarios_f_bp = Blueprint('usuarios_f_bp', __name__)

class Usuarios:
    @staticmethod
    def crear_usuario(nombre, apell_pate, apell_mate, usuario, contraseña, rol_id):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("INSERT INTO usuarios (nombre, apell_pate, apell_mate, usuario, pass, rol_id) VALUES (?, ?, ?, ?, ?, ?)", (nombre, apell_pate, apell_mate, usuario, contraseña, rol_id))
            conn.commit()
            conn.close()
            return True
        except sqlite3.Error as e:
            print("Error al registrar usuario:", e)
            return False

    @staticmethod
    def obtener_usuario_por_id(usuario_id):
        try:
            conn =get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM usuarios WHERE id = ?", (usuario_id,))
            usuario = cursor.fetchone()
            conn.close()
            return usuario
        except sqlite3.Error as e:
            print("Error al obtener usuario por ID:", e)
            return None

    @staticmethod
    def actualizar_usuario(usuario_id, nombre, apell_pate, apell_mate, usuario, contraseña, rol_id):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("UPDATE usuarios SET nombre = ?, apell_pate = ?, apell_mate = ?, usuario = ?, pass = ?, rol_id = ? WHERE id = ?", (nombre, apell_pate, apell_mate, usuario, contraseña, rol_id, usuario_id))
            conn.commit()
            conn.close()
            return True
        except sqlite3.Error as e:
            print("Error al actualizar usuario:", e)
            return False

    @staticmethod
    def borrar_usuario(usuario_id):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("DELETE FROM usuarios WHERE id = ?", (usuario_id,))
            conn.commit()
            conn.close()
            return True
        except sqlite3.Error as e:
            print("Error al borrar usuario:", e)
            return False

    @staticmethod
    def obtener_todos_los_usuarios():
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM usuarios")
            usuarios = cursor.fetchall()
            conn.close()

            usuarios_list = []
            for usuario in usuarios:
                usuario_dict = {
                    'id': usuario['id'],
                    'nombre': usuario['nombre'],
                    'apell_pate': usuario['apell_pate'],
                    'apell_mate': usuario['apell_mate'],
                    'usuario': usuario['usuario'],
                    'pass': usuario['pass'],
                    'rol_id': usuario['rol_id']
                }
                usuarios_list.append(usuario_dict)

            return usuarios_list
        except sqlite3.Error as e:
            print("Error al obtener todos los usuarios:", e)
            return []



@usuarios_f_bp.route('/obtener_usuarios', methods=['GET'])
def obtener_usuarios():
    usuarios = Usuarios.obtener_todos_los_usuarios()
    return jsonify(usuarios)


def obtener_id_rol_por_nombre(nombre_rol):
    """
    Obtiene el ID del rol a partir de su nombre.
    
    Args:
        nombre_rol (str): El nombre del rol.
    
    Returns:
        int: El ID del rol si se encuentra, None si no se encuentra.
    """
    try:
        conn =get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT id FROM roles WHERE nombre = ?", (nombre_rol,))
        fila = cursor.fetchone()
        
        if fila:
            return fila[0]
        else:
            return None
    except sqlite3.Error as e:
        print("Error al obtener ID del rol:", e)
        return None
    finally:
        if conn:
            conn.close()

@usuarios_f_bp.route('/verificar_nombre_usuario', methods=['POST'])
def verificar_nombre_usuario():
    nombre_usuario = request.form['nombre_usuario']

    if verificar_nombre_usuario_db(nombre_usuario):  
        return jsonify({'disponible': True})  
    else:
        return jsonify({'disponible': False})  

def verificar_nombre_usuario_db(nombre_usuario): 
    """
    Verifica si un nombre de usuario ya está en uso en la base de datos.

    Args:
        nombre_usuario (str): El nombre de usuario a verificar.

    Returns:
        bool: True si el nombre de usuario está disponible, False si no lo está.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM usuarios WHERE usuario = ?", (nombre_usuario,))
        cantidad = cursor.fetchone()[0]
        conn.close()
        return cantidad == 0  
    except sqlite3.Error as e:
        print("Error al verificar nombre de usuario:", e)
        return False


@usuarios_f_bp.route('/registro', methods=['GET', 'POST'])
def registro():
    if request.method == 'POST':
        try:
           
            nombre = request.form['nombre']
            apell_pate = request.form['apell_pate']
            apell_mate = request.form['apell_mate']
            usuario = request.form['usuario']
            contraseña = request.form['contraseña']
            rol_nombre = request.form['rol']  
            
            rol_id = obtener_id_rol_por_nombre(rol_nombre)

            if Usuarios.crear_usuario(nombre, apell_pate, apell_mate, usuario, contraseña, rol_id):
                return redirect(url_for('index'))
            else:
                return "Error al registrar usuario", 500  
        except sqlite3.IntegrityError as e:
            mensaje_error = "El nombre de usuario ya está en uso. Por favor, elija otro."
            return render_template('usuarios_f.html', error=mensaje_error)
        except Exception as e:
            print("Error:", e)
            return "Error al procesar la solicitud", 500  
    else:
        return render_template('usuarios_f.html')

@usuarios_f_bp.route('/eliminar_usuario/<int:usuario_id>', methods=['POST'])
def eliminar_usuario(usuario_id):
    if Usuarios.borrar_usuario(usuario_id):
        return redirect(url_for('index'))  
    else:
        return "Error al eliminar usuario", 500 
3
@usuarios_f_bp.route('/editar_usuario/<int:usuario_id>', methods=['GET', 'POST'])
def editar_usuario(usuario_id):
    if request.method == 'POST':
        try:        
        
            nombre = request.form['nombre']
            apell_pate = request.form['apell_pate']
            apell_mate = request.form['apell_mate']
            usuario = request.form['usuario']
            contraseña = request.form['contraseña']
            rol_nombre = request.form['rol'] 

            rol_id = obtener_id_rol_por_nombre(rol_nombre)

            if Usuarios.actualizar_usuario(usuario_id, nombre, apell_pate, apell_mate, usuario, contraseña, rol_id):
                return redirect(url_for('index'))
            else:
                return "Error al actualizar usuario", 500  
        except Exception as e:
            print("Error:", e)
            return "Error al procesar la solicitud", 500 

@usuarios_f_bp.route('/obtener_usuario/<int:usuario_id>', methods=['GET'])
def obtener_usuario_api(usuario_id):
    usuario = obtener_usuario_por_id(usuario_id)
    if usuario:
        return jsonify(usuario)  
    else:
        return "Usuario no encontrado", 404  

def obtener_usuario_por_id(usuario_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM usuarios WHERE id = ?", (usuario_id,))
        usuario = cursor.fetchone()
        conn.close()
        if usuario:
            return {
                'id': usuario[0],
                'nombre': usuario[1],
                'apell_pate': usuario[2],
                'apell_mate': usuario[3],
                'usuario': usuario[4],
                'pass': usuario[5],
                'rol_id': usuario[6]
            }
        else:
            return None
    except sqlite3.Error as e:
        print("Error al obtener usuario:", e)
        return None
