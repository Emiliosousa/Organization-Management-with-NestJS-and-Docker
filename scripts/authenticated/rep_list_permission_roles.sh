#!/usr/bin/env bash
set -euo pipefail

# Cargar configuraciones comunes
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$DIR/common_setup.sh"

# Uso:  sh ./rep_list_permission_roles.sh ../anonymus/.session SUBJECT_UP
validate_and_load_session "$1"

if [ $# -ne 2 ]; then
    echo "Uso: $0 <session_file> <permission>"
    exit 1
fi

# Construir URL con query opcional de name
URL="$API_BASE_URL/role/roles/$2"

# Llamar a la API
RESPONSE=$(curl -s -X GET "$URL" \
    -H "Authorization: ${SESSION_TOKEN}")

echo "$RESPONSE"
