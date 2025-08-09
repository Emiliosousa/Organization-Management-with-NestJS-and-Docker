#!/usr/bin/env bash

if [ $# -ne 2 ]; then
  echo "Uso: $0 <session_file> <username>"
  exit 1
fi
 
cd ../scripts/authenticated
sh ./rep_list_subject_roles.sh "$1" "$2"
