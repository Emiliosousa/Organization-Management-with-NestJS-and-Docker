#!/usr/bin/env bash

if [ $# -ne 1 ]; then
  echo "Uso: $0 <session_file>"
  exit 1
fi

sh ../scripts/authenticated/rep_list_roles.sh "$1"
