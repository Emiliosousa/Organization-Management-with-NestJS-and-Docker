#!/usr/bin/env bash
set -euo pipefail

# Cargar configuraciones comunes
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$DIR/../authenticated/common_setup.sh"

# Uso: sh rep_add_role.sh ../anonymus/.session lector "[DOC_NEW, DOC_READ]"
validate_and_load_session "$1"

if [ $# -ne 3 ]; then
  echo "Uso: $0 <session_file> <role_name> <role_permissions>"
  exit 1
fi

ROLE_NAME="$2"
ROLE_PERMISSIONS="$3"

# Formatear permissions como JSON
ROLE_PERMISSIONS_JSON=$(echo "$ROLE_PERMISSIONS" | sed 's/[][]//g' | sed 's/,/","/g' | sed 's/^/["/' | sed 's/$/"]/')

# Construir URL para el POST
URL="$API_BASE_URL/role"

# Llamar a la API con POST y pasar name y permissions en el body
RESPONSE=$(curl -s -X POST "$URL" \
    -H "Authorization: ${SESSION_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"$ROLE_NAME\", \"permissions\": $ROLE_PERMISSIONS_JSON}")

echo "$RESPONSE"