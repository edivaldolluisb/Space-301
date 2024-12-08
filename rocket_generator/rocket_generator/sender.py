import json
import logging
import pika

from config import RABBITMQ_HOST, QUEUE_NAME

class SendData:
    def __init__(self):
        print(f"Conectando ao RabbitMQ no host: {RABBITMQ_HOST}")

        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST, port=5672))
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=QUEUE_NAME, durable=True)  # Garantir que a fila existe

    def send(self, data):
        self.channel.basic_publish(
            exchange='',
            routing_key=QUEUE_NAME,
            body=json.dumps(data)  
        )

    def close(self):
        self.connection.close()


