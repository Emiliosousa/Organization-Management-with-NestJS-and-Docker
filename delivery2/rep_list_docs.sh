#!/usr/bin/env bash

if [ $# -ne 1 ]; then
  echo "Uso: $0 <session_file>"
  exit 1
fi
#sh ./rep_list_docs.sh ../anonymus/.session
cd ../scripts/authenticated
sh ./rep_list_docs.sh "$1"
