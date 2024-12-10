#!/usr/bin/env bash

curl -X POST http://localhost:8080/api/v1/rockets -H "Content-Type: application/json" -d '{
  "name": "Test Rocket"
}'