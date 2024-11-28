import json
import logging
import pika

from config import RABBITMQ_HOST, RECEIVER_QUEUE_NAME

class ReceberLancamentos:
    def __init__(self):
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST, port=5672))
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=RECEIVER_QUEUE_NAME, durable=True)  

    def callback(self, ch, method, properties, body):
        # data = json.loads(body)  
        print(f" [x] Recebido: {body}")

    def start_consuming(self):
        self.channel.basic_consume(
            queue=RECEIVER_QUEUE_NAME, 
            on_message_callback=self.callback, 
            auto_ack=True
        )
        print(' [*] Aguardando lançamentos. Para sair, pressione CTRL+C')
        self.channel.start_consuming()

    def close(self):
        self.connection.close()


if __name__ == "__main__":
    receiver = ReceberLancamentos()
    try:
        receiver.start_consuming()
    except KeyboardInterrupt:
        receiver.close()
