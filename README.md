![Texto alternativo](static/servidor_db_/1.png)

# Instalación de Dependencias

Para comenzar a trabajar en este proyecto, primero debes asegurarte de tener todas las dependencias necesarias instaladas en tu sistema. Sigue los pasos a continuación para instalarlas:

## Requisitos Previos

Asegúrate de tener los siguientes requisitos previos instalados en tu sistema:

- `git`
- `python3`
- `python3-pip`
- `open-vm-tools`
- `curl`
- `sqlite3`
- `unzip`

### Pasos de Instalación

1. **Actualizar Repositorios:**

   ```bash
   sudo apt-get update
   ```

2. **Instalar Dependencias:**

   ```bash
   sudo apt install -y git python3 python3-pip open-vm-tools curl sqlite3 unzip
   ```

   En sistemas Ubuntu, instala el paquete `python3.10-venv`, mientras que en sistemas Debian, instala `python3.11-venv`.

   ```bash
   # Ubuntu
   sudo apt install python3.10-venv -y

   # Debian
   sudo apt install python3.11-venv -y
   ```

3. **Verificar Versión de Python:**

   ```bash
   python3 --version
   ```

4. **Crear y Activar un Entorno Virtual:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

5. **Instalar Dependencias Dentro del Entorno Virtual:**

   ```bash
   pip install flask sqlalchemy pdfkit gunicorn pyqrcode python-barcode qrcode pillow
   ```

6. **Configurar Nginx:**

   Se proporciona un script de instalación para configurar Nginx. Antes de ejecutarlo, asegúrate de tener los permisos adecuados:

   ```bash
   chmod +x install_nginx.sh
   ```

   Luego, ejecuta el script:

   ```bash
   ./install_nginx.sh
   ```

   Si estás en Debian, puedes necesitar cambiar al usuario `su` antes de ejecutar el script:

   ```bash
   su
   # Luego ingresa tu contraseña de administrador y ejecuta el script
   ./install_nginx.sh
   ``` 
6. **Configurar git:**
Resumen de Comandos:
git add: Agrega archivos al área de preparación.
git commit: Confirma los cambios con un mensaje descriptivo.
git push: Envía los cambios confirmados al repositorio remoto.