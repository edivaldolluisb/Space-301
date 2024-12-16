#!/bin/bash

# Verifica se a API retorna uma lista vazia
RESPONSE=$(curl -s http://localhost:8080/api/v1/astronauts)

if [[ "$RESPONSE" == "[]" ]]; then
    echo "A inserir astronautas..."

    curl -X POST http://localhost:8080/api/v1/astronauts -H "Content-Type: application/json" -d '{
        "name": "Amelia Earhart",
        "gender": "Feminino",
        "height": 1.65,
        "age": 39,
        "weight": 60,
        "photo": "/Amelia_Earhart.webp"
    }'

    curl -X POST http://localhost:8080/api/v1/astronauts -H "Content-Type: application/json" -d '{
        "name": "Neil Armstrong",
        "gender": "Masculino",
        "height": 1.80,
        "age": 39,
        "weight": 75,
        "photo": "/Neil_Armstrong.webp"
    }'

    curl -X POST http://localhost:8080/api/v1/astronauts -H "Content-Type: application/json" -d '{
        "name": "Katherine Johnson",
        "gender": "Feminino",
        "height": 1.60,
        "age": 50,
        "weight": 62,
        "photo": "/Katherine_Johnson.webp"
    }'

    curl -X POST http://localhost:8080/api/v1/astronauts -H "Content-Type: application/json" -d '{
        "name": "Buzz Aldrin",
        "gender": "Masculino",
        "height": 1.75,
        "age": 40,
        "weight": 78,
        "photo": "/Buzz_Aldrin.webp"
    }'

    curl -X POST http://localhost:8080/api/v1/astronauts -H "Content-Type: application/json" -d '{
        "name": "Valentina Tereshkova",
        "gender": "Feminino",
        "height": 1.68,
        "age": 57,
        "weight": 55,
        "photo": "/Amelia_Earhart.webp"
    }'

    curl -X POST http://localhost:8080/api/v1/astronauts -H "Content-Type: application/json" -d '{
        "name": "Yuri Gagarin",
        "gender": "Masculino",
        "height": 1.62,
        "age": 34,
        "weight": 70,
        "photo": "/Neil_Armstrong.webp"
    }'

    curl -X POST http://localhost:8080/api/v1/astronauts -H "Content-Type: application/json" -d '{
        "name": "Sally Ride",
        "gender": "Feminino",
        "height": 1.68,
        "age": 45,
        "weight": 65,
        "photo": "/Katherine_Johnson.webp"
    }'

    curl -X POST http://localhost:8080/api/v1/astronauts -H "Content-Type: application/json" -d '{
        "name": "John Glenn",
        "gender": "Masculino",
        "height": 1.75,
        "age": 80,
        "weight": 85,
        "photo": "/Buzz_Aldrin.webp"
    }'

    curl -X POST http://localhost:8080/api/v1/astronauts -H "Content-Type: application/json" -d '{
        "name": "Mae Jemison",
        "gender": "Feminino",
        "height": 1.63,
        "age": 58,
        "weight": 62,
        "photo": "/Amelia_Earhart.webp"
    }'

    curl -X POST http://localhost:8080/api/v1/astronauts -H "Content-Type: application/json" -d '{
        "name": "Alan Shepard",
        "gender": "Masculino",
        "height": 1.73,
        "age": 74,
        "weight": 77,
        "photo": "/Neil_Armstrong.webp"
    }'

    echo "Dados inseridos com sucesso!"
else
    echo "Dados já existem na db."
fi
