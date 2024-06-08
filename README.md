![Texto alternativo](/static/servidor_db_/1.png)

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
   ![Texto alternativo](/static/servidor_db_/2.png)

6. **Configurar git:**
### Configuración de Git: Resumen de Comandos

gui raida git :

1. **Agregar cambios al área de preparación:**

   - `git add .`: Agrega todos los cambios en tu directorio de trabajo al área de preparación.
   
   - `git add nombre_del_archivo`: Agrega un archivo específico al área de preparación. Reemplaza `nombre_del_archivo` con el nombre del archivo que deseas agregar.

2. **Confirmar cambios:**

   - `git commit -m "mensaje"`: Confirma los cambios agregados al área de preparación con un mensaje descriptivo que explica qué cambios realizaste. Reemplaza `"mensaje"` con una descripción clara de tus cambios.

   Por ejemplo:
   ```bash
   git commit -m "Agregado nuevo archivo de configuración"


### Licencia
Este proyecto está licenciado bajo [MIT License](LICENSE).
