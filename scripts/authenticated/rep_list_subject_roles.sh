#!/usr/bin/env bash
set -euo pipefail

# Cargar configuraciones comunes
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$DIR/common_setup.sh"

# Uso:  sh ./rep_list_subject_roles.sh ../anonymus/.session
validate_and_load_session "$1"

if [ $# -ne 2 ]; then
    echo "Uso: $0 <session_file> <username>"
    exit 1
fi

# Llamar a la API
RESPONSE=$(curl -s -X GET "$API_BASE_URL/subject/roles/$2" \
    -H "Authorization: ${SESSION_TOKEN}")

echo "$RESPONSE"
