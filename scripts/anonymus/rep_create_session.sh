#!/usr/bin/env bash
set -euo pipefail

# Cargar configuraciones comunes
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$DIR/common.sh"

# sh ./rep_create_session.sh hola hola
if [ $# -ne 2 ]; then
    echo "Uso: $0 <username> <password>"
    exit 1
fi

USERNAME="$1"
PASSWORD="$2"
SESSION_FILE=".session"

DATA=$(jq -n --arg user "$USERNAME" --arg pass "$PASSWORD" \
    '{username: $user, password: $pass}')

RESPONSE=$(curl -s -X POST "$API_BASE_URL/session" \
    -H "Content-Type: application/json" \
    -d "$DATA")

TOKEN=$(echo "$RESPONSE" | jq -r '.sessionToken // empty')

if [ -z "$TOKEN" ]; then
    error_exit "No se pudo obtener el token de sesión"
fi
## Check if the file exists
if [ -f "$SESSION_FILE" ]; then
    rm "$SESSION_FILE"
fi
echo "$TOKEN" > "$SESSION_FILE"
echo "Sesión creada. Token guardado en $SESSION_FILE"
