#pdf.py
from flask import Flask, render_template, session, send_file, jsonify, request
import sqlite3
import pdfkit
import os
import io
import qrcode
import locale
locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')
import barcode 
from barcode.writer import ImageWriter
import uuid
import datetime
import hashlib
import tempfile
import unicodedata
from flask import send_file

def get_db_connection():
    try:
        db_path = os.path.join(os.path.dirname(__file__), 'database', 'datos.db')
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.Error as e:
        print("Error de conexión a la base de datos:", e)
        return None
def listar_formularios(criterio_busqueda):
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT id, nombres, ap_paterno, ap_materno, carnet, titulo, anio_publi FROM formulario WHERE nombres LIKE ? OR ap_paterno LIKE ? OR ap_materno LIKE ? OR carnet LIKE ?", ('%' + criterio_busqueda + '%', '%' + criterio_busqueda + '%', '%' + criterio_busqueda + '%', '%' + criterio_busqueda + '%'))

            formularios = cursor.fetchall()
            return jsonify(formularios=[dict(row) for row in formularios])
        except sqlite3.Error as e:
            print("Error de consulta a la base de datos:", e)
        finally:
            conn.close()
    else:
        return "Error de conexión a la base de datos."
    

def generar_certificado(formulario_id, usuario_id):
    print("Comenzando generación de certificado...")
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()

            cursor.execute("SELECT * FROM administrador ORDER BY id DESC LIMIT 1")
            administrador = cursor.fetchone()

            cursor.execute("SELECT * FROM formulario WHERE id = ?", (formulario_id,))
            formulario = cursor.fetchone()

            id_cod_pdf = generar_codigo_unico()

            cod_reg_1 = generar_codigo_registro()

            datos_cod_serial = f"{administrador['grado_estudio']} {administrador['nombre']} {administrador['ape_pate']}{administrador['ape_mate']}--{usuario_id}-{formulario_id}"
            cod_serial = hashlib.sha1(datos_cod_serial.encode()).hexdigest()

            cursor.execute("INSERT INTO registros (evento, fecha, usuario_id, id_formulario, id_Cod_pdf, cod_serial, cod_reg_1) VALUES (?, ?, ?, ?, ?, ?, ?)", ("Generación de certificado", datetime.datetime.now(), usuario_id, formulario_id, id_cod_pdf, cod_serial, cod_reg_1))
            conn.commit()

            cursor.execute("SELECT fecha, cod_serial, cod_reg_1 FROM registros ORDER BY id DESC LIMIT 1")
            ultimo_registro = cursor.fetchone()

            datos_para_codigo_barras = f"{formulario['carnet']} {administrador['ape_pate']}"
            datos_qr = f"{id_cod_pdf} {formulario['grado_p']} {formulario['nombres']} {formulario['ap_paterno']} {formulario['ap_materno']} {formulario['carnet']} {ultimo_registro['fecha']}"

            barra_1 = datos_para_codigo_barras
            datos_qr = datos_qr

            rendered = render_template('certificado_1.html', administrador=administrador, formulario=formulario, barra_1=barra_1, ultimo_registro=ultimo_registro, datos_qr=datos_qr, fecha_actual=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), hora_actual=datetime.datetime.now().strftime("%H:%M:%S"), fecha_nueva=datetime.datetime.now().strftime("%d de %B %Y"), año_actual=datetime.datetime.now().strftime("%Y"))

            config = pdfkit.configuration(wkhtmltopdf='/usr/bin/wkhtmltopdf')  
            options = {
                'enable-local-file-access': ''
            }

            pdf = pdfkit.from_string(rendered, False, configuration=config, options=options)
            pdf_bytes = io.BytesIO(pdf)
            print("PDF generado.")
            return send_file(pdf_bytes, as_attachment=True, download_name='certificado.pdf')
        except Exception as e:
            print("Error al generar el certificado:", e)
            return "Se produjo un error al generar el certificado. Por favor, inténtalo de nuevo más tarde."
        finally:
            conn.close()
    else:
        return "Error de conexión a la base de datos."


def generar_codigo_unico():
    return str(uuid.uuid4())[:8]

ultimo_año = datetime.datetime.now().year
ultimo_numero_registro = 0

ultimo_año = datetime.datetime.now().year
ultimo_numero_registro = 0

def generar_codigo_registro():
    global ultimo_año
    global ultimo_numero_registro
    
    año_actual = datetime.datetime.now().year
    
    if año_actual != ultimo_año:
        ultimo_año = año_actual
        ultimo_numero_registro = 0
    
    ultimo_numero_registro += 1
    
    codigo_registro = str(ultimo_numero_registro).zfill(3)
    
    return codigo_registro