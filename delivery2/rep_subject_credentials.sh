#!/usr/bin/env bash

if [ $# -ne 1 ]; then
  echo "Uso: $0 <password>"
  exit 1
fi

cd ../scripts/local
sh ./rep_subject_credentials.sh "$1"
