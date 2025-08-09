#!/usr/bin/env bash
set -euo pipefail

# Cargar configuraciones comunes
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$DIR/common_setup.sh"

# Uso:  sh ./rep_list_docs.sh ../anonymus/.session
validate_and_load_session "$1"

# Construir URL con query opcional de name
URL="$API_BASE_URL/document"

# Llamar a la API
RESPONSE=$(curl -s -X GET "$URL" \
    -H "Authorization: ${SESSION_TOKEN}")

echo "$RESPONSE"
