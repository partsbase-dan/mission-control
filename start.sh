#!/bin/bash
cd "$(dirname "$0")"
echo "Mission Control dashboard at http://localhost:8080/CoWork/dashboard.html"
open "http://localhost:8080/CoWork/dashboard.html"
python3 -m http.server 8080
