#app.py
from flask import Flask, render_template, request, redirect, url_for, session
from login import login
from usuarios_f import usuarios_f_bp
from formulario_f import formulario_f_bp
import pdf
import os 



app = Flask(__name__)
app.secret_key = 'Ares_#54321' 

@app.route('/')
def index():
    return render_template('index.html')

app.register_blueprint(login, url_prefix='/auth')
    
app.register_blueprint(usuarios_f_bp)

app.register_blueprint(formulario_f_bp)

    

@app.route('/admin')
def admin_page():
    if 'role' in session:
        print(f"Sesión rol: {session['role']}")
    if 'role' in session and session['role'] == 1:
        usuario = session.get('username')
        print(f"Usuario: {usuario}")  

        return render_template('admin.html',usuario=usuario)
    else:
        return redirect(url_for('login.login_page'))


@app.route('/busqueda')
def busqueda():
    if 'role' in session:
        print(f"Sesión rol: {session['role']}")
    if 'role' in session and session['role'] == 1:
        usuario = session.get('username')
        print(f"Usuario: {usuario}")  

        return render_template('busqueda.html',usuario=usuario,pagina_actual="busqueda")
    else:
        return redirect(url_for('login.login_page'))
    
    
@app.route('/AgregarUsuario')
def AgregarUsuario():
    if 'role' in session:
        print(f"Sesión rol: {session['role']}")
    if 'role' in session and session['role'] == 1:
        usuario = session.get('username')
        print(f"Usuario: {usuario}")  

        return render_template('usuario_f.html',usuario=usuario,pagina_actual="AgregarUsuario")
    else:
        return redirect(url_for('login.login_page'))

@app.route('/RegistrarFormulario')
def RegistrarFormulario():
    if 'role' in session:
        print(f"Sesión rol: {session['role']}")
    if 'role' in session and session['role'] == 1:
        usuario = session.get('username')
        print(f"Usuario: {usuario}")  

        return render_template('control_fom.html',usuario=usuario,pagina_actual="RegistrarFormulario")
    else:
        return redirect(url_for('login.login_page'))




@app.route('/reporte')
def reporte():
    if 'role' in session:
        print(f"Sesión rol: {session['role']}")
    if 'role' in session and session['role'] == 1:
        usuario = session.get('username')
        print(f"Usuario: {usuario}") 

        return render_template('reporte.html',usuario=usuario,pagina_actual="reporte")
    else:
        return redirect(url_for('login.login_page'))

    


    
    
    

@app.route('/user')
def user_page():
    if 'role' in session:
        print(f"Sesión rol: {session['role']}")
    if 'role' in session and session['role'] != 1:  
        return render_template('user.html')
    else:
        return redirect(url_for('login.login_page'))
    

# formulario  pdf
#Ruta para listar los formularios según el criterio de búsqueda
@app.route('/listar_formularios', methods=['GET'])
def listar_formularios():
    criterio_busqueda = request.args.get('criterio_busqueda', '')
    return pdf.listar_formularios(criterio_busqueda)


@app.route('/generar_certificado/<int:formulario_id>')
def generar_certificado(formulario_id):
    if 'usuario_id' in session:
        usuario_id = session['usuario_id']
        return pdf.generar_certificado(formulario_id, usuario_id)
    else:
        return redirect(url_for('login.login_page'))  



if __name__ == '__main__':
    app.run(debug=True, port=5555)
