#!/bin/bash

set -e

sudo sed -i '1 s/^/#/' /etc/apt/sources.list

# Agregar repositorios de Debian Bookworm
echo "Agregando repositorios de Debian Bookworm..."
sudo tee -a /etc/apt/sources.list << EOF
deb http://deb.debian.org/debian bookworm main non-free-firmware
deb-src http://deb.debian.org/debian bookworm main non-free-firmware

deb http://deb.debian.org/debian-security/ bookworm-security main non-free-firmware
deb-src http://deb.debian.org/debian-security/ bookworm-security main non-free-firmware

deb http://deb.debian.org/debian bookworm-updates main non-free-firmware
deb-src http://deb.debian.org/debian bookworm-updates main non-free-firmware
EOF
echo"instalacion terminada se puede actualizar "
echo"apt update && apt upgrate"