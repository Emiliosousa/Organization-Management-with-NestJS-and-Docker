#!/usr/bin/env bash
set -euo pipefail

# URL base de la API
API_BASE_URL="http://localhost:3000"

# Función para imprimir errores y salir
error_exit() {
    echo "ERROR: $1" >&2
    exit 1
}
