#!/usr/bin/env bash
set -euo pipefail

# Uso: sh authorized/rep_add_doc.sh anonymus/.session prueba prueba.txt aes-256-cbc local/pub.key

if [ $# -ne 5 ]; then
  echo "Uso: $0 <session_file> <document_name> <input_file> <algorithm> <public_key_path>"
  exit 1
fi

SESSION_FILE="$1"
DOCUMENT_NAME="$2"
INPUT_FILE="$3"
ALGORITHM="$4"      # Ej: aes-256-cbc
PUBLIC_KEY_PATH="$5"

# Convertir rutas a absolutas para evitar problemas en Git Bash
SESSION_FILE=$(realpath "$SESSION_FILE")
INPUT_FILE=$(realpath "$INPUT_FILE")
PUBLIC_KEY_PATH=$(realpath "$PUBLIC_KEY_PATH")

API_URL="http://localhost:3000"
ENDPOINT="/document"

# Configuramos una limpieza final pase lo que pase
cleanup() {
  rm -f sym_key.bin sym_key.enc sym_key.b64 "${DOCUMENT_NAME}.enc"
}
trap cleanup EXIT

# Verificar archivo de sesión
if [ ! -f "$SESSION_FILE" ]; then
  echo "No se encontró el archivo de sesión: $SESSION_FILE"
  exit 1
fi
SESSION_TOKEN="$(cat "$SESSION_FILE")"

# Verificar archivo de entrada
if [ ! -f "$INPUT_FILE" ]; then
  echo "No se encontró el archivo de entrada: $INPUT_FILE"
  exit 1
fi

# Generar clave simétrica aleatoria (32 bytes para AES-256)
openssl rand 32 > sym_key.bin

# Encriptar el archivo con algoritmo simétrico y pbkdf2
ENCRYPTED_FILE="${DOCUMENT_NAME}.enc"
if ! openssl enc -"${ALGORITHM}" -pbkdf2 -in "$INPUT_FILE" -out "$ENCRYPTED_FILE" -pass file:sym_key.bin; then
  echo "Error al encriptar el archivo con openssl enc"
  exit 1
fi

# Cifrar la clave simétrica con clave pública usando pkeyutl
if ! openssl pkeyutl -encrypt -pubin -inkey "$PUBLIC_KEY_PATH" -in sym_key.bin -out sym_key.enc \
    -pkeyopt rsa_padding_mode:oaep -pkeyopt rsa_oaep_md:sha256; then
  echo "Error al cifrar la clave simétrica con pkeyutl. Verifica la clave pública en: $PUBLIC_KEY_PATH"
  exit 1
fi

# Verificar que sym_key.enc no esté vacío
if [ ! -s sym_key.enc ]; then
  echo "Error: sym_key.enc no se creó correctamente o está vacío."
  exit 1
fi

# Codificar clave cifrada a base64
if ! base64 < sym_key.enc > sym_key.b64; then
  echo "Error al convertir la clave cifrada a base64"
  exit 1
fi

echo "Archivo ${DOCUMENT_NAME} encriptado correctamente."

# Enviar petición POST con curl (multipart/form-data)
if ! curl -X POST "${API_URL}${ENDPOINT}" \
    -H "Authorization: ${SESSION_TOKEN}" \
    -F "name=${DOCUMENT_NAME}" \
    -F "algorithm=${ALGORITHM}" \
    -F "key=$(cat sym_key.b64)" \
    -F "file=@${ENCRYPTED_FILE}"; then
  echo "Error al enviar el archivo a la API. Verifica la conexión y los parámetros."
  exit 1
fi

echo "Archivo ${DOCUMENT_NAME} subido correctamente a la API."
