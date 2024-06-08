#lineas.py
from flask import Blueprint, render_template
from flask import abort, session

link_bp = Blueprint('link', __name__)

def proteger_rutas():
    if 'usuario' not in session:
        abort(401)
