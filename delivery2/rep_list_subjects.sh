#!/usr/bin/env bash

if [ $# -ne 1 ]; then
  echo "Uso: $0 <session_file>"
  exit 1
fi
# Uso:  sh ./rep_list_subjects.sh ../anonymus/.session [name, opcional]
cd ../scripts/authenticated
sh ./rep_list_subjects.sh "$1"
