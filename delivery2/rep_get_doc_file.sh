#!/usr/bin/env bash

if [ $# -ne 2 ]; then
  echo "Uso: $0 <session_file> <document_id>"
  exit 1
fi

sh ../scripts/authorized/rep_get_doc_file.sh "$1" "$2"
