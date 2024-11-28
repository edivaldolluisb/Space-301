import json
import logging
import pika

from config import RABBITMQ_HOST, QUEUE_NAME

# class Send():
#     def __init__(self):
#         self.queue = "launch_data"
#         self.connection = None
#         self.channel = None

#     def connect(self):
#         self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq', port=5672))
#         self.channel = self.connection.channel()
#         self.channel.queue_declare(queue=self.queue, durable=True)

#     def disconnect(self):
#         self.connection.close()

#     def send(self, message):
#         message = json.dumps(message)
#         logging.info("Sending message: {}".format(message))
#         print("Sending message: {}".format(message))
#         self.channel.basic_publish(exchange='', routing_key=self.queue, body=message)

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
        print(f" [x] Enviado: {data}")

    def close(self):
        self.connection.close()


