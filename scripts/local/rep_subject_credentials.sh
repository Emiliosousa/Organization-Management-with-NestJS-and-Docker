#!/usr/bin/env bash
set -e

# uso: sh ./rep_subject_credentials.sh hola

if [ $# -ne 1 ]; then
    echo "Uso: $0 <password>"
    exit 1
fi

PASSWORD="$1"

# Generar clave privada RSA cifrada con la contraseña
# 2048 bits es un tamaño común; puedes ajustarlo si necesitas más seguridad.
openssl genrsa -aes256 -passout pass:"$PASSWORD" -out priv.key 2048

# Extraer la clave pública desde la privada
openssl rsa -in priv.key -pubout -passin pass:"$PASSWORD" -out pub.key

echo "Credenciales RSA generadas y guardadas en /local"