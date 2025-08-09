#!/usr/bin/env bash

if [ $# -ne 5 ]; then
  echo "Uso: $0 <session_file> <document_name> <input_file> <algorithm> <public_key_path>"
  exit 1
fi


cd ../scripts/authorized

sh ./rep_add_doc.sh "$1" "$2" "$3" "$4" "$5"
