#!/usr/bin/env bash

if [ $# -ne 2 ]; then
  echo "Uso: $0 <encrypted_file> <metadata_file>"
  exit 1
fi

cd ../scripts/local

sh ./rep_decrypt_file.sh "$1" "$2"
