#!/usr/bin/env bash

if [ $# -ne 2 ]; then
  echo "Uso: $0 <username> <password>"
  exit 1
fi
cd ../scripts/anonymus
sh ./rep_create_session.sh "$1" "$2"
