#!/usr/bin/env bash

if [ $# -ne 6 ]; then
  echo "Uso: $0 <organization> <username> <name> <password> <email> <public_key_file>"
  exit 1
fi

cd ../scripts/anonymus

sh ./rep_create_org.sh "$1" "$2" "$3" "$4" "$5" "$6"