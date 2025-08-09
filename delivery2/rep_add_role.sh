#!/usr/bin/env bash

if [ $# -ne 3 ]; then
  echo "Uso: $0 <session_file> <role_name> [permissions]"
  exit 1
fi
cd ../scripts/authorized
sh ./rep_add_role.sh "$1" "$2" "$3"
