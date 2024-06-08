#!/bin/bash
PROJECT_NAME="dicyt_server_v5"

NGINX_CONF="/etc/nginx/sites-available/$PROJECT_NAME"
# Instalar y configurar Nginx si aún no está instalado
if ! command -v nginx &> /dev/null; then
    echo "nginx no está instalado. Instalando..."
    sudo apt-get install -y nginx
fi

# Crear archivo de configuración de Nginx
if [ ! -f "$NGINX_CONF" ]; then
    sudo bash -c "cat <<EOT > $NGINX_CONF
server {
    listen 80;
    server_name $PROJECT_NAME.local;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /static/ {
        alias $STATIC_DIR;
    }

    error_log /var/log/nginx/$PROJECT_NAME_error.log;
    access_log /var/log/nginx/$PROJECT_NAME_access.log;
}
EOT"
    sudo ln -s /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
fi

if ! grep -q "$PROJECT_NAME.local" /etc/hosts; then
    echo "Añadiendo $PROJECT_NAME.local a /etc/hosts"
    echo "127.0.0.1 $PROJECT_NAME.local" | sudo tee -a /etc/hosts
fi

echo "Todo está configurado correctamente. Puedes iniciar tu aplicación con el siguiente comando:"
echo "cd origen diciyt_server_v5"
echo "source venv/bin/activate"
echo "gunicorn -w 4 -b 127.0.0.1:8000 wsgi:app"