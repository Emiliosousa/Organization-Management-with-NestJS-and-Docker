#!/usr/bin/env bash

if [ $# -ne 2 ]; then
  echo "Uso: $0 <session_file> <role_name>"
  exit 1
fi

sh ../scripts/authenticated/rep_assume_role.sh "$1" "$2"
