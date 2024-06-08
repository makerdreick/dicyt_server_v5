#formulario_f.py
from flask import Blueprint, request, jsonify, redirect, url_for, render_template
import sqlite3
from manager import get_db_connection


formulario_f_bp = Blueprint('formulario_f_bp', __name__)

@formulario_f_bp.route('/formulario_f', methods=['GET'])
def mostrar_formulario_f():
    return render_template('formulario_f.html')

class Formulario:
    @staticmethod
    def crear_formulario(cargo, tp_cargo, gestion, cod_cargo, grado_p, nombres, ap_paterno, ap_materno, carnet, RU, cod_depo, titulo, tipo_pro, tipo_revista, anio_publi, tipo_autor, genero, exten):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("INSERT INTO formulario (cargo, tp_cargo, gestion, cod_cargo, grado_p, nombres, ap_paterno, ap_materno, carnet, RU, cod_depo, titulo, tipo_pro, tipo_revista, anio_publi, tipo_autor, genero, exten) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                       (cargo, tp_cargo, gestion, cod_cargo, grado_p, nombres, ap_paterno, ap_materno, carnet, RU, cod_depo, titulo, tipo_pro, tipo_revista, anio_publi, tipo_autor, genero, exten))
            conn.commit()
            conn.close()
            return True
        except sqlite3.Error as e:
            print("Error al crear formulario:", e)
        return False


    @staticmethod
    def obtener_formulario_por_id(formulario_id):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM formulario WHERE id = ?", (formulario_id,))
            formulario = cursor.fetchone()
            conn.close()
            return formulario
        except sqlite3.Error as e:
            print("Error al obtener formulario por ID:", e)
            return None

    @staticmethod
    def actualizar_formulario(formulario_id, cargo, tp_cargo, gestion, cod_cargo, grado_p, nombres, ap_paterno, ap_materno, carnet, RU, cod_depo, titulo, tipo_pro, tipo_revista, anio_publi, tipo_autor, genero, exten):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("UPDATE formulario SET cargo = ?, tp_cargo = ?, gestion = ?, cod_cargo = ?, grado_p = ?, nombres = ?, ap_paterno = ?, ap_materno = ?, carnet = ?, RU = ?, cod_depo = ?, titulo = ?, tipo_pro = ?, tipo_revista = ?, anio_publi = ?, tipo_autor = ?, genero = ?, exten = ? WHERE id = ?",(cargo, tp_cargo, gestion, cod_cargo, grado_p, nombres, ap_paterno, ap_materno, carnet, RU, cod_depo, titulo, tipo_pro, tipo_revista, anio_publi, tipo_autor, genero, exten,formulario_id,))
            conn.commit()
            conn.close()
            return True
        except sqlite3.Error as e:
            print("Error al actualizar formulario:", e)
            return False

    @staticmethod
    def borrar_formulario(formulario_id):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("DELETE FROM formulario WHERE id = ?", (formulario_id,))
            conn.commit()
            conn.close()
            return True
        except sqlite3.Error as e:
            print("Error al borrar formulario:", e)
            return False

    @staticmethod
    def obtener_todos_los_formularios():
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM formulario")
            formularios = cursor.fetchall()
            conn.close()
            return formularios
        except sqlite3.Error as e:
            print("Error al obtener todos los formularios:", e)
            return []

@formulario_f_bp.route('/obtener_formularios', methods=['GET'])
def obtener_formularios():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM formulario")
        formularios = cursor.fetchall()
        conn.close()

        formularios_list = [dict(formulario) for formulario in formularios]

        return jsonify(formularios_list)
    except sqlite3.Error as e:
        print("Error al obtener todos los formularios:", e)
        return jsonify([])  

@formulario_f_bp.route('/crear_formulario', methods=['POST'])
def crear_formulario():
    
    cargo = request.form.get('cargo')
    tp_cargo = request.form.get('tp_cargo')
    gestion = request.form.get('gestion')
    cod_cargo = request.form.get('cod_cargo')
    grado_p = request.form.get('grado_p')
    nombres = request.form.get('nombres')
    ap_paterno = request.form.get('ap_paterno')
    ap_materno = request.form.get('ap_materno')
    genero = request.form.get('genero')
    carnet = request.form.get('carnet')
    exten = request.form.get('exten')
    RU = request.form.get('RU')
    cod_depo = request.form.get('cod_depo')
    titulo = request.form.get('titulo')
    tipo_pro = request.form.get('tipo_pro')
    tipo_revista = request.form.get('tipo_revista')
    anio_publi = request.form.get('anio_publi')
    tipo_autor = request.form.get('tipo_autor')
    
    
    if genero.strip().lower() == 'masculino':
        genero = 'el'
    elif genero.strip().lower() == 'femenino':
        genero = 'la'
    if not all([cargo, tp_cargo, gestion, cod_cargo, grado_p, nombres, ap_paterno, ap_materno, genero, carnet, exten, RU, cod_depo, titulo, tipo_pro, tipo_revista, anio_publi, tipo_autor]):
        return "Error: Uno o más campos están vacíos", 400
    if not Formulario.crear_formulario(cargo, tp_cargo, gestion, cod_cargo, grado_p, nombres, ap_paterno, ap_materno, carnet, RU, cod_depo, titulo, tipo_pro, tipo_revista, anio_publi, tipo_autor, genero, exten):
        return "Error al crear formulario", 500

    return redirect(url_for('formulario_f_bp.mostrar_formulario_f'))


@formulario_f_bp.route('/editar_formulario/<int:formulario_id>', methods=['POST'])
def editar_formulario(formulario_id):
    cargo = request.form.get('cargo')
    tp_cargo = request.form.get('tp_cargo')
    gestion = request.form.get('gestion')
    cod_cargo = request.form.get('cod_cargo')
    grado_p = request.form.get('grado_p')
    nombres = request.form.get('nombres')
    ap_paterno = request.form.get('ap_paterno')
    ap_materno = request.form.get('ap_materno')
    genero = request.form.get('genero')
    carnet = request.form.get('carnet')
    exten = request.form.get('exten')
    RU = request.form.get('RU')
    cod_depo = request.form.get('cod_depo')
    titulo = request.form.get('titulo')
    tipo_pro = request.form.get('tipo_pro')
    tipo_revista = request.form.get('tipo_revista')
    anio_publi = request.form.get('anio_publi')
    tipo_autor = request.form.get('tipo_autor')
    
    if genero.strip().lower() == 'masculino':
        genero = 'el'
    elif genero.strip().lower() == 'femenino':
        genero = 'la'
        
    if not all([cargo, tp_cargo, gestion, cod_cargo, grado_p, nombres, ap_paterno, ap_materno, genero, carnet, exten, RU, cod_depo, titulo, tipo_pro, tipo_revista, anio_publi, tipo_autor]):
        return "Error: Uno o más campos están vacíos", 400
    
    if not Formulario.actualizar_formulario(formulario_id, cargo, tp_cargo, gestion, cod_cargo, grado_p, nombres, ap_paterno, ap_materno, carnet, RU, cod_depo, titulo, tipo_pro, tipo_revista, anio_publi, tipo_autor, genero, exten):
        return "Error al actualizar formulario", 500
    
    return "Formulario actualizado exitosamente"


@formulario_f_bp.route('/obtener_formulario_por_id/<int:formulario_id>', methods=['GET'])
def obtener_formulario_por_id(formulario_id):
    formulario = Formulario.obtener_formulario_por_id(formulario_id)
    if formulario:
        formulario_dict = dict(formulario)
        return jsonify(formulario_dict)
    else:
        return "Formulario no encontrado", 404

    
def obtener_usuario_por_id(formulario_id):
    try:
        conn =get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM formulario WHERE id = ?", (formulario_id,))
        usuario = cursor.fetchone()
        conn.close()
        if usuario:
            return {
                'id': usuario[0],
                'cargo': usuario[1],
                'tp_cargo': usuario[2],
                'gestion': usuario[3],
                'cod_cargo': usuario[4],
                'grado_p': usuario[5],
                'nombres': usuario[6],
                'ap_paterno': usuario[7],
                'ap_materno': usuario[8],
                'genero': usuario[9],
                'carnet': usuario[10],
                'exten': usuario[11],
                'RU': usuario[12],
                'cod_depo': usuario[13],
                'titulo': usuario[14],
                'tipo_pro': usuario[15],
                'tipo_revista': usuario[16],
                'anio_publi': usuario[17],
                'tipo_autor': usuario[18]
            }
        else:
            return None
    except sqlite3.Error as e:
        print("Error al obtener usuario:", e)
        return None  




@formulario_f_bp.route('/eliminar_formulario/<int:formulario_id>', methods=['POST'])
def eliminar_formulario(formulario_id):
    if not Formulario.borrar_formulario(formulario_id):
        return "Error al eliminar formulario", 500
    
    return "Formulario eliminado exitosamente"



