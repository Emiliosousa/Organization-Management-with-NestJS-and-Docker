#!/usr/bin/env bash

if [ $# -lt 1 ] || [ $# -gt 2 ]; then
  echo "Uso: $0 <file_handle> [output_file]"
  exit 1
fi

cd ../scripts/anonymus
sh ./rep_get_file.sh "$1" "${2:-}"
