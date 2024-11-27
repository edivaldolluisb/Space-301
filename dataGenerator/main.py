import asyncio
import random
import json
import time

from generator import Generator
from sender import SendData


# Edivaldo enviando dados ✌️😎
if __name__ == "__main__":
    gerador = Generator()
    sender = SendData()

    try:
        while True:
            dados = gerador.generate_data()
            sender.send(dados)
            time.sleep(1)  
    except KeyboardInterrupt:
        sender.close()