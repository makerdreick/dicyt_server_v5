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

## Estado del Proyecto Actual

Este proyecto está en desarrollo activo y actualmente se encuentra en la versión 0.1.125

### Versiones Estables

- Versión 0.1.78:
- Trabaja con Debian 12.5 de la versión estable 0.1.121

### Características en Desarrollo

- Funcionalidad Certificacion Online: SISTEMA COM API GLOBAL PARA CERTIFICACION DIGITAL
  
- Mejoras en la interfaz de usuario:La version basica esta pensada para uso no comercial pero a nivel universitario ya que es  un sistema interno ,para poder certificar a varias carreras en el area de invetigacion, y  instituto de investigacion.

### Próximas Actualizaciones

- Nuevas características API GLOBAL: Con un app andriod se podra validar certificaciones globales,a nivel nacional.
- Correcciones de errores menores: Mejoras en las clasificacion de cerficaciones segun el rango de estudio.

## Ejemplos de Uso

Aquí hay algunos ejemplos de cómo puedes utilizar este proyecto en situaciones reales:

###  Certificación de Estudios en Bolivia con lineas de investigacion en areas especificas

Sistema de certificacion de Aportes Academicos a nivel nacional  en el sistema CUEB.
### 6. **Configurar git:**

```bash


### Configuración de Git: Resumen de Comandos

Guía rápida de git:

1. **Agregar cambios al área de preparación:**
   - `git add .`: Agrega todos los cambios en tu directorio de trabajo al área de preparación.
   - `git add nombre_del_archivo`: Agrega un archivo específico al área de preparación. Reemplaza `nombre_del_archivo` con el nombre del archivo que deseas agregar.

2. **Confirmar cambios:**
   - `git commit -m "mensaje"`: Confirma los cambios agregados al área de preparación con un mensaje descriptivo que explica qué cambios realizaste. Reemplaza `"mensaje"` con una descripción clara de tus cambios.
 ```
Por ejemplo:

```bash
     git commit -m "Agregado nuevo archivo de configuración"
 ```

video guia
![Video Demostrativo](enlace_al_video)

### Licencia
Este proyecto está licenciado bajo [MIT License](LICENSE).