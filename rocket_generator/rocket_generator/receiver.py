import json
import pika
import asyncio
from rocket import Rocket
from config import RABBITMQ_HOST, RECEIVER_QUEUE_NAME


class ReceberLancamentos:
    def __init__(self, loop):
        self.loop = loop
        self.connection = None
        self.channel = None
        self.lauch_list = asyncio.Queue()

    async def connect(self):
        """Acho melhor estabelecer assim a conexão assíncrona com RabbitMQ."""
        self.connection = await self.loop.run_in_executor(
            None,
            lambda: pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST, port=5672))
        )
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=RECEIVER_QUEUE_NAME, durable=True)

    def callback(self, ch, method, properties, body):
        try:
            data = json.loads(body)
            print(f" [x] Recebido: {data}")
            asyncio.run_coroutine_threadsafe(self.lauch_list.put(data), self.loop)
        except json.JSONDecodeError as e:
            print(f"Erro ao decodificar mensagem: {e}")
            print(f"Mensagem recebida: {body}")

    async def start_consuming(self):
        await self.connect()
        self.channel.basic_consume(
            queue=RECEIVER_QUEUE_NAME,
            on_message_callback=self.callback,
            auto_ack=True
        )
        print(' [*] Aguardando lançamentos. Para sair, pressione CTRL+C')
        await self.loop.run_in_executor(None, self.channel.start_consuming)

    async def lauch_manager(self):
        while True:
            data = await self.lauch_list.get()
            lauch_id = data["id_lancamento"]
            astronauts = [astronaut_data["astronaut_id"] for astronaut_data in data["astronauts"]]

            print(f"Processando lançamento: {data}")

            rocket = Rocket(lauch_id, *astronauts)
            asyncio.create_task(rocket.gerar_dados())

    def close(self):
        if self.connection:
            self.connection.close()

def main():
    loop = asyncio.get_event_loop()
    receiver = ReceberLancamentos(loop)

    try:
        loop.create_task(receiver.lauch_manager())
        loop.run_until_complete(receiver.start_consuming())
        loop.run_forever()
    except KeyboardInterrupt:
        receiver.close()
        print("\nFinalizando o consumidor...")

if __name__ == "__main__":
    main()
