instalacion de las depependencias.
primero deverias instalar las dependencias
# Actualizar repositorios

sudo apt-get update
sudo apt install -y git python3 python3-pip open-vm-tools curl sqlite3 unzip
sudo apt install python3.11-venv -y
#sudo apt-get install wkhtmltopdf -y en caso erro local
# Verificar versión de Python
python3 --version
# Crear entorno virtual con venv
python3 -m venv 
# Activar entorno virtual
source "venv/bin/activate"

Instalar las dependecias dentro del venv
-
pip install flask sqlalchemy pdfkit gunicorn pyqrcode python-barcode qrcode pillow

#se creo un script para nigx configurado "install_nigx.sh"
#para correr el script se debe cambiar los priviliegios 
-
chmod +r install_nigx.sh 
#si estas debian    su    y luego el password 
#bash install_nigx.sh  para correrlo.