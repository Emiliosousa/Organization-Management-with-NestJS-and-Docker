#!/usr/bin/env bash
set -euo pipefail

# Cargar configuraciones comunes
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$DIR/../authenticated/common_setup.sh"

# Uso: sh rep_suspend_role.sh ../anonymus/.session lector
validate_and_load_session "$1"

if [ $# -ne 2 ]; then
  echo "Uso: $0 <session_file> <role_name>"
  exit 1
fi

# Construir URL para el POST
URL="$API_BASE_URL/role/suspend/$2"

RESPONSE=$(curl -s -X POST "$URL" \
    -H "Authorization: ${SESSION_TOKEN}" \
    -H "Content-Type: application/json")

echo "$RESPONSE"