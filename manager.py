#manager.py
import sqlite3
import os
def get_db_connection():
    try:
        db_path = os.path.join(os.path.dirname(__file__), 'database', 'datos.db')
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.Error as e:
        print("Error de conexión a la base de datos principal:", e)
        return None

def verificar_conexion():
    conn = get_db_connection()
    if conn:
        conn.close()
        return True
    else:
        return False
