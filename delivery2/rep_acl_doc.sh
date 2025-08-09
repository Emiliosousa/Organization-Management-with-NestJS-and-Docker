#!/usr/bin/env bash

if [ $# -ne 3 ]; then
  echo "Uso: $0 <session_file> <document_id> <acl>"
  exit 1
fi

sh ../scripts/authorized/rep_acl_doc.sh "$1" "$2" "$3"
