# Exemplo de como interagir com o receptor

import time
import pika
import json
from config import RABBITMQ_HOST, RECEIVER_QUEUE_NAME

mensagem = {
    "id_lancamento": "2",
    "astronauts": [
        {"astronaut_id": 1},
        {"astronaut_id": 2},
        {"astronaut_id": 3},
        {"astronaut_id": 4}
    ]
}

# mensagem2 = {
#     "id_lancamento": "LAZIO",
#     "astronauts": [
#         {"astronaut_id": "ALA1"},
#         {"astronaut_id": "ALA2"},
#         {"astronaut_id": "ALA3"},
#         {"astronaut_id": "ALA4"}
#     ]
# }

connection = pika.BlockingConnection(pika.ConnectionParameters(host="backend")) #TOUPDATE
channel = connection.channel()
channel.queue_declare(queue=RECEIVER_QUEUE_NAME, durable=True)

channel.basic_publish(
    exchange='', 
    routing_key=RECEIVER_QUEUE_NAME,
    body=json.dumps(mensagem),  
    properties=pika.BasicProperties(
        delivery_mode=2,  
    )
)

print(f"Mensagem publicada na fila '{RECEIVER_QUEUE_NAME}': {mensagem}")

# time.sleep(3)

# channel.basic_publish(
#     exchange='', 
#     routing_key=RECEIVER_QUEUE_NAME,
#     body=json.dumps(mensagem2),  
#     properties=pika.BasicProperties(
#         delivery_mode=2,  
#     )
# )

# print(f"Mensagem publicada na fila '{RECEIVER_QUEUE_NAME}': {mensagem2}")

connection.close()
