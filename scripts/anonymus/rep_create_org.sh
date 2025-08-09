#!/usr/bin/env bash
set -euo pipefail

# Cargar configuraciones comunes
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$DIR/common.sh"

# sh ./rep_create_org.sh Probando hola hola hola hola@outlook.com ../local/pub.key

if [ $# -ne 6 ]; then
    echo "Uso: $0 <organization> <username> <name> <password> <email> <public_key_file>"
    exit 1
fi

ORG="$1"
USERNAME="$2"
NAME="$3"
PASSWORD="$4"
EMAIL="$5"
PUBKEY_FILE="$6"

if [ ! -f "$PUBKEY_FILE" ]; then
    error_exit "El archivo de clave pública no existe: $PUBKEY_FILE"
fi

PUBKEY_CONTENT=$(cat "$PUBKEY_FILE")

# Cuerpo del request en JSON
DATA=$(jq -n --arg organizationName "$ORG" \
          --arg username "$USERNAME" \
          --arg fullName "$NAME" \
          --arg email "$EMAIL" \
          --arg publicKey "$PUBKEY_CONTENT" \
          --arg password "$PASSWORD" \
          '{organizationName: $organizationName, username: $username, fullName: $fullName, email: $email, publicKey: $publicKey, password: $password}')


# Llamar a la API
RESPONSE=$(curl -s -X POST "$API_BASE_URL/organization" \
    -H "Content-Type: application/json" \
    -d "$DATA")

echo "$RESPONSE"
