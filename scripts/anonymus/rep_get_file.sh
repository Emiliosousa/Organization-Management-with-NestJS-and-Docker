#!/usr/bin/env bash
set -euo pipefail

# Cargar configuraciones comunes
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$DIR/common.sh"

if [ $# -lt 1 ] || [ $# -gt 2 ]; then
    echo "Uso: $0 <file_handle> [file]"
    exit 1
fi

FILE_HANDLE="$1"
OUTPUT_FILE="${2:-}"

if [ -z "$OUTPUT_FILE" ]; then
    # Sin archivo de salida, directo por stdout
    curl -s -X GET "$API_BASE_URL/document/$FILE_HANDLE"
else
    curl -s -X GET "$API_BASE_URL/document/$FILE_HANDLE" -o "$OUTPUT_FILE"
    echo "Archivo descargado en $OUTPUT_FILE"
fi
