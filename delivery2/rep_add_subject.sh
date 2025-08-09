#!/usr/bin/env bash

if [ $# -ne 5 ]; then
  echo "Uso: $0 <session_file> <username> <name> <email> <public_key>"
  exit 1
fi

sh ../scripts/authorized/rep_add_subject.sh "$1" "$2" "$3" "$4" "$5"
