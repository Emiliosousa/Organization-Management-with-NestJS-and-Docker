#!/usr/bin/env bash

if [ $# -ne 3 ]; then
  echo "Uso: $0 <session_file> <role_name> <username>"
  exit 1
fi

sh ../scripts/authorized/rep_remove_role_to_subject.sh "$1" "$2" "$3"
