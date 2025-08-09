#!/usr/bin/env bash
set -euo pipefail

# Cargar configuraciones comunes
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$DIR/common_setup.sh"

# Uso:  sudo sh ./rep_list_role_permissions.sh ../anonymus/.session owner
validate_and_load_session "$1"

if [ $# -ne 2 ]; then
    echo "Uso: $0 <session_file> <role_name>"
    exit 1
fi

# Construir URL con query opcional de name
URL="$API_BASE_URL/role/permissions/$2"

# Llamar a la API
RESPONSE=$(curl -s -X GET "$URL" \
    -H "Authorization: ${SESSION_TOKEN}")

echo "$RESPONSE"
