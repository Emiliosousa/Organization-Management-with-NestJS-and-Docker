#!/usr/bin/env bash
set -euo pipefail

# Cargar configuraciones comunes
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$DIR/../authenticated/common_setup.sh"

# Uso: sh rep_assign_role_to_subject.sh ../anonymus/.session lector hola
validate_and_load_session "$1"

if [ $# -ne 3 ]; then
  echo "Uso: $0 <session_file> <role_name> <username>"
  exit 1
fi

ROLE_NAME="$2"
USERNAME="$3"

# Construir URL para el POST
URL="$API_BASE_URL/role/addRole/$USERNAME/$ROLE_NAME"

# Llamar a la API con POST y pasar name y permissions en el body
RESPONSE=$(curl -s -X POST "$URL" \
    -H "Authorization: ${SESSION_TOKEN}" \
    -H "Content-Type: application/json")

echo "$RESPONSE"