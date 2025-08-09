#!/usr/bin/env bash

if [ $# -ne 2 ]; then
  echo "Uso: $0 <session_file> <permission>"
  exit 1
fi
cd ../scripts/authenticated
sh ./rep_list_role_permissions.sh "$1" "$2"
