#!/usr/bin/env bash

if [ $# -ne 3 ]; then
  echo "Uso: $0 <session_file> <role_name> <permission>"
  exit 1
fi
cd ../scripts/authorized
sh ./rep_add_permission.sh "$1" "$2" "$3"
