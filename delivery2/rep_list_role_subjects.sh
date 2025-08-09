#!/usr/bin/env bash

if [ $# -ne 2 ]; then
  echo "Uso: $0 <session_file> <role_name>"
  exit 1
fi

cd ../scripts/authenticated
sh rep_list_role_subjects.sh "$1" "$2"
