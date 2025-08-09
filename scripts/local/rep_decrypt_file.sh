#!/usr/bin/env bash
set -euo pipefail

# Uso: sh rep_decrypt_file.sh <encrypted_file> <encryption_metadata>

if [ $# -ne 2 ]; then
    echo "Uso: $0 <encrypted_file> <encryption_metadata>"
    exit 1
fi

ENCRYPTED_FILE="$1"
METADATA_FILE="$2"

# Extraer el algoritmo y la clave del archivo de metadata
ALG=$(grep '"alg"' "$METADATA_FILE" | sed -E 's/.*"alg"[[:space:]]*:[[:space:]]*"([^"]*)".*/\1/')
KEY_B64=$(grep '"key"' "$METADATA_FILE" | sed -E 's/.*"key"[[:space:]]*:[[:space:]]*"([^"]*)".*/\1/')

# Verificar si se extrajeron los valores correctamente
if [ -z "$ALG" ] || [ -z "$KEY_B64" ]; then
    echo "ERROR: No se pudo extraer el algoritmo o la clave del archivo de metadata."
    exit 1
fi

# Decodificar la clave desde base64
KEY=$(echo "$KEY_B64" | base64 -d)

# Desencriptar el archivo usando la clave simétrica
DECRYPTED_FILE="${ENCRYPTED_FILE%.enc}_decrypted.txt"
if openssl "$ALG" -d -in "$ENCRYPTED_FILE" -out "$DECRYPTED_FILE" -pass stdin <<< "$KEY"; then
    echo "Archivo desencriptado correctamente: $DECRYPTED_FILE"
else
    echo "ERROR: Fallo al desencriptar el archivo."
    exit 1
fi
