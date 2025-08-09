#!/usr/bin/env bash

if [ $# -ne 2 ]; then
  echo "Uso: $0 <session_file> <subject_email>"
  exit 1
fi

sh ../scripts/authorized/rep_suspend_subject.sh "$1" "$2"
