#login.py
import random
import string
from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from manager import get_db_connection, verificar_conexion

login = Blueprint('login', __name__)

def generar_token():
    letras = ''.join(random.choices(string.ascii_letters, k=3))
    numeros = ''.join(random.choices(string.digits, k=3))
    extra = ''.join(random.choices(string.ascii_letters + string.digits, k=1))
    token = letras + numeros + extra
    token_list = list(token)
    random.shuffle(token_list)  
    return ''.join(token_list)

@login.route('/login', methods=['GET', 'POST'])
def login_page():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        token = request.form['token']

        if session.get('token') != token:
            flash("El token es incorrecto. Inténtalo de nuevo.", "error")
            return redirect(url_for('login.login_page'))

        conn = get_db_connection()
        if conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM usuarios WHERE usuario = ? AND pass = ?", (username, password))
            user = cursor.fetchone()
            conn.close()

            if user:
                session['username'] = username
                session['role'] = user['rol_id']
                session['usuario_id'] = user['id'] 

                return redirect(url_for('admin_page' if user['rol_id'] == 1 else 'user_page'))
            else:
                flash('Credenciales incorrectas. Inténtalo de nuevo.', 'error')
        else:
            flash('Error al conectar con la base de datos.', 'error')

    if verificar_conexion():
        flash("Conexión establecida con la base de datos.", "success")
    else:
        flash("No se pudo establecer conexión con la base de datos.", "error")

    token = generar_token()
    session['token'] = token

    return render_template('login.html', token=token)

@login.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('role', None)
    session.pop('token', None)
    return redirect(url_for('login.login_page'))
