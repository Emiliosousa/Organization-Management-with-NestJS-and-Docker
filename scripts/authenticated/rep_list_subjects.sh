#!/usr/bin/env bash
set -euo pipefail

# Cargar configuraciones comunes
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$DIR/common_setup.sh"

# Uso:  sh ./rep_list_subjects.sh ../anonymus/.session [name, opcional]
validate_and_load_session "$1"

NAME=""
if [ $# -eq 2 ]; then
    NAME="$2"
elif [ $# -ne 1 ]; then
    echo "Uso: $0 <session_file> [name]"
    exit 1
fi

# Construir URL con query opcional de name
URL="$API_BASE_URL/subject/ofMyOrganization"
if [ -n "$NAME" ]; then
    URL="$URL?name=$NAME"
fi

# Llamar a la API
RESPONSE=$(curl -s -X GET "$URL" \
    -H "Authorization: ${SESSION_TOKEN}")

echo "$RESPONSE"
