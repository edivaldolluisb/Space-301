import random
import json
import time

class Generator:
    @staticmethod
    def generate_data():
        # Simula dados de lançamentos
        return {
            "id": random.randint(1, 1000),
            "valor": round(random.uniform(10.0, 1000.0), 2),
            "descricao": "Lancamento aleatorio",
            "data": time.strftime("%Y-%m-%d %H:%M:%S")
        }
