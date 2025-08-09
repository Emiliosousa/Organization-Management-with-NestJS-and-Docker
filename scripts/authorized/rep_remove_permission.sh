#!/usr/bin/env bash
set -euo pipefail

# Cargar configuraciones comunes
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$DIR/../authenticated/common_setup.sh"

# Uso: sh rep_add_permission.sh ../anonymus/.session lector ROLE_UP
validate_and_load_session "$1"

if [ $# -ne 3 ]; then
  echo "Uso: $0 <session_file> <role_name> <role_permission>"
  exit 1
fi

ROLE_NAME="$2"
ROLE_PERMISSION="$3"

# Construir URL para el POST
URL="$API_BASE_URL/role/removePermission"

# Llamar a la API con POST y pasar name y permissions en el body
RESPONSE=$(curl -s -X POST "$URL" \
    -H "Authorization: ${SESSION_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{\"roleName\": \"$ROLE_NAME\", \"permission\": \"$ROLE_PERMISSION\"}")

echo "$RESPONSE"