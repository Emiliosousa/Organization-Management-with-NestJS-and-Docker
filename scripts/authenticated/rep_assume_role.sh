#!/usr/bin/env bash
set -euo pipefail

if [ $# -ne 2 ]; then
    echo "Uso: $0 <session_file> <permission>"
    exit 1
fi
# Cargar configuraciones comunes
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$DIR/common_setup.sh"

# Uso:  sh ./rep_assume_role.sh ../anonymus/.session lector
validate_and_load_session "$1"

# Construir URL con query opcional de name
URL="$API_BASE_URL/session/assume/$2"

# Llamar a la API
RESPONSE=$(curl -s -X POST "$URL" \
    -H "Authorization: ${SESSION_TOKEN}" \
    -H "Content-Type: application/json")

echo "$RESPONSE"
