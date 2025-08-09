#!/usr/bin/env bash

if [ $# -ne 1 ]; then
  echo "Uso: $0 <session_file>"
  exit 1
fi
cd ../scripts/authenticated
sh ./rep_drop_role.sh "$1"
