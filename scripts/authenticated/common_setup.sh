#!/usr/bin/env bash
set -euo pipefail

# Cargar configuraciones comunes
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$DIR/../anonymus/common.sh"

# Validar archivo de sesión y cargar token
validate_and_load_session() {
  if [ $# -ne 1 ]; then
    echo "Uso: $0 <session_file>"
    exit 1
  fi

  local session_file="$1"

  if [ ! -f "$session_file" ]; then
    echo "No se encontró el archivo de sesión: $session_file"
    exit 1
  fi

  export SESSION_TOKEN="$(cat "$session_file")"
}
