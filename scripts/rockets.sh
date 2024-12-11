#!/bin/bash
URL="http://localhost:8080/api/v1/rockets"

response=$(curl -s "$URL")
if [ -z "$response" ] || [ "$response" == "[]" ]; then
  declare -a rockets=(
    '{"name": "Falcon 9", "capacity": 22, "weight": 549000, "numAstronauts": 7, "height": 70, "diameter": 3.7, "originCountry": "USA"}'
    '{"name": "Starship", "capacity": 100, "weight": 1200000, "numAstronauts": 10, "height": 120, "diameter": 9.0, "originCountry": "USA"}'
    '{"name": "Soyuz", "capacity": 7, "weight": 750000, "numAstronauts": 3, "height": 15, "diameter": 2.2, "originCountry": "Russia"}'
    '{"name": "Atlas V", "capacity": 18, "weight": 340000, "numAstronauts": 3, "height": 58, "diameter": 3.8, "originCountry": "USA"}'
    '{"name": "Delta IV Heavy", "capacity": 28, "weight": 733000, "numAstronauts": 5, "height": 72, "diameter": 5.1, "originCountry": "USA"}'
    '{"name": "Long March 5", "capacity": 25, "weight": 870000, "numAstronauts": 3, "height": 60, "diameter": 5.0, "originCountry": "China"}'
    '{"name": "Vega C", "capacity": 1.5, "weight": 138000, "numAstronauts": 3, "height": 30, "diameter": 2.3, "originCountry": "Europe"}'
    '{"name": "Electron", "capacity": 0.3, "weight": 12000, "numAstronauts": 4, "height": 18, "diameter": 1.2, "originCountry": "New Zealand"}'
    '{"name": "H-IIA", "capacity": 12, "weight": 289000, "numAstronauts": 6, "height": 54, "diameter": 4.0, "originCountry": "Japan"}'
    '{"name": "Ariane 5", "capacity": 21, "weight": 780000, "numAstronauts": 3, "height": 50, "diameter": 5.4, "originCountry": "Europe"}'
  )

  for rocket in "${rockets[@]}"; do
    curl -X POST "$URL" -H "Content-Type: application/json" -d "$rocket"
    echo -e "\nFoguete adicionado!"
  done
else
  echo "Já existem foguetes na base de dados. Nenhum dado foi inserido."
fi
