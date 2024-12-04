import asyncio
import numpy as np
import random
from sender import SendData

class Rocket:
    def __init__(self, id_lancamento, astronaut1, astronaut2, astronaut3, astronaut4) -> None:
        self.id_lancamento = id_lancamento
        self.TRIPULANTES = [
            {'id': astronaut1},
            {'id': astronaut2},
            {'id': astronaut3},
            {'id': astronaut4}
        ]

        # Constantes
        self.GRAVIDADE = 9.81  # m/s²
        self.PRESSAO_NIVEL_DO_MAR = 101325  # Pa
        self.TEMPERATURA_NIVEL_DO_MAR = 288.15  # K
        self.TAXA_QUEDA_PRESSAO = 12.5  # Pa/m (exemplo)
        self.COMBUSTIVEL_INICIAL = 2000000  # kg
        self.QUEIMA_COMBUSTIVEL = 2000  # kg/s
        self.ENERGIA_MINIMA = 100.0  # J (energia inicial)
        self.ENERGIA_MAXIMA = 50000.0  # J (energia máxima)
        self.QUALIDADE_SINAL_INICIAL = 100.0  # %
        self.TEMPERATURA_MOTOR_BASE = 303.15  # K
        self.TEMPERATURA_MOTOR_MAXIMA = 600.0  # K
        self.TEMPERATURA_INTERNA_BASE = 295.15  # K
        self.TEMPERATURA_EXTERNA_BASE = 288.15  # K (temperatura ao nível do mar)
        self.NIVEL_OXIGENIO_INICIAL = 21.0  # % (percentual de oxigênio na cabine)
        self.VELOCIDADE_X_MAXIMA = 300.0  # m/s (velocidade horizontal máxima)

        self.PRESSAO_INTERNA_BASE = 1.0  # atm (mantida constante)
        self.NIVEL_OXIGENIO_BASE = 8.5  # mol/m³
        self.BPM_BASE = 75  # bpm
        self.PRESSAO_ARTERIAL_BASE = (120, 80)  # mmHg (sistólica, diastólica)
        self.RESPIRACAO_BASE = 16  # rpm
        self.NIVEL_RADIACAO_BASE = 0.01  # Sv/h
        self.NIVEL_RADIACAO_ESPACO = 0.5  # Sv/h
        self.DIMENSAO_NAVE = (10, 5, 4)  # Comprimento, largura, altura (m)

        self.total_time = 20 * 60  # 20 minutos em segundos
        self.time_intervals = np.arange(1, self.total_time + 1, 1)

        self.sender = SendData()

    def gerar_dados_tripulante(self, estagio, tripulante):
        if estagio == "subida" or estagio == "descida":
            pa_sistolica = self.PRESSAO_ARTERIAL_BASE[0] + random.uniform(5, 15)
            pa_diastolica = self.PRESSAO_ARTERIAL_BASE[1] + random.uniform(3, 10)
            oxigenio_sangue = self.NIVEL_OXIGENIO_BASE - random.uniform(0.2, 0.5)
            bpm = self.BPM_BASE + random.uniform(10, 20)
            respiracao = self.RESPIRACAO_BASE + random.uniform(2, 5)
            temperature = 36 + random.uniform(-1, 3)
        else:
            pa_sistolica = self.PRESSAO_ARTERIAL_BASE[0] + random.uniform(-5, 5)
            pa_diastolica = self.PRESSAO_ARTERIAL_BASE[1] + random.uniform(-3, 3)
            oxigenio_sangue = self.NIVEL_OXIGENIO_BASE + random.uniform(-0.2, 0.2)
            bpm = self.BPM_BASE + random.uniform(-5, 5)
            respiracao = self.RESPIRACAO_BASE + random.uniform(-1, 1)
            temperature = 36 + random.uniform(-0.5, 1)
        
        alertas_tripulante = []
        if pa_sistolica > 140:
            alertas_tripulante.append({"parametro": "pa_sistolica", "nome_alerta": "Hipertensão"})
        if oxigenio_sangue < 7.5:
            alertas_tripulante.append({"parametro": "oxigenio_sangue", "nome_alerta": "Baixo O2"})
        if bpm > 100:
            alertas_tripulante.append({"parametro": "bpm", "nome_alerta": "Taquicardia"})
        if respiracao > 20:
            alertas_tripulante.append({"parametro": "respiracao", "nome_alerta": "Respiração Acelerada"})

        return {
            "id": tripulante["id"],
            "pa_sistolica": pa_sistolica,
            "pa_diastolica": pa_diastolica,
            "oxigenio_sangue": oxigenio_sangue,
            "bpm": bpm,
            "respiracao": respiracao,
            "temperature": temperature,
            "alertas": alertas_tripulante,
        }

    async def gerar_dados(self):
        # Simulação
        for t in self.time_intervals:
            alertas = [] 

            if int(t) <= 300:  # Subida: 5 minutos
                estagio = "subida"
                altitude = (int(t) / 300) ** 2 * 100000  # Altitude em metros
                velocidade = (2 * (int(t) / 300)) * (100000 / 300)  # m/s
                aceleracao = 2 * (100000 / 300 ** 2)  # m/s²
                velocidade_x = min(self.VELOCIDADE_X_MAXIMA, int(t) * (self.VELOCIDADE_X_MAXIMA / 300))  # m/s (cresce na subida)
                combustivel = max(self.COMBUSTIVEL_INICIAL - int(t) * self.QUEIMA_COMBUSTIVEL, 0)
                energia_atual = self.ENERGIA_MINIMA + (self.ENERGIA_MAXIMA - self.ENERGIA_MINIMA) * (int(t) / 300)  # Energia aumenta linearmente
            elif int(t) <= 900:  # Órbita: 10 minutos
                estagio = "orbita"
                altitude = 100000  # Altitude constante em metros
                velocidade = 0  # Velocidade constante (relativa ao solo)
                aceleracao = 0  # Sem aceleração
                velocidade_x = self.VELOCIDADE_X_MAXIMA  # Velocidade horizontal constante
                combustivel = max(self.COMBUSTIVEL_INICIAL - 300 * self.QUEIMA_COMBUSTIVEL, 0)
                energia_atual = self.ENERGIA_MAXIMA  # Energia se mantém próxima do máximo
                altitude += random.uniform(-500, 500)
            else:  # Descida: 5 minutos
                estagio = "descida"
                altitude = 100000 - ((int(t) - 900) / 300) ** 2 * 100000  # Altitude em metros
                velocidade = -2 * ((int(t) - 900) / 300) * (100000 / 300)  # m/s
                aceleracao = -2 * (100000 / 300 ** 2)  # m/s²
                velocidade_x = max(0, self.VELOCIDADE_X_MAXIMA - (int(t) - 900) * (self.VELOCIDADE_X_MAXIMA / 300))  # m/s
                combustivel = 0  # Sem combustível
                energia_atual = self.ENERGIA_MAXIMA - (self.ENERGIA_MAXIMA - self.ENERGIA_MINIMA) * ((int(t) - 900) / 300)  # Energia diminui

            dados_tripulantes = [self.gerar_dados_tripulante(estagio, tripulante) for tripulante in self.TRIPULANTES]

            # Cálculos comuns a todos os estágios
            forca = aceleracao / self.GRAVIDADE
            pressao_atual = max(self.PRESSAO_NIVEL_DO_MAR - altitude * self.TAXA_QUEDA_PRESSAO / 1000, 0)
            temperatura_atual = max(self.TEMPERATURA_NIVEL_DO_MAR - altitude * 0.0065, 200)
            qualidade_atual = max(self.QUALIDADE_SINAL_INICIAL - int(t) * 0.05, 90.0)
            oxigenio_atual = max(self.NIVEL_OXIGENIO_INICIAL - (int(t) / self.total_time) * 5.0, 15.0)  # O2 diminui, mas nunca abaixo de 15%

            # Temperatura do motor
            temperatura_motor_atual = self.TEMPERATURA_MOTOR_BASE + aceleracao * 20
            if aceleracao <= 0:
                temperatura_motor_atual = max(
                    self.TEMPERATURA_MOTOR_BASE, temperatura_motor_atual - abs(aceleracao) * 15
                )
            temperatura_motor_atual = min(temperatura_motor_atual, self.TEMPERATURA_MOTOR_MAXIMA)

            # Temperatura externa
            if altitude > 50000:  # A partir de 50 km, o espaço é frio
                temperatura_externa_atual = max(3, self.TEMPERATURA_EXTERNA_BASE - altitude * 0.01 - velocidade * 0.005)
            else:
                temperatura_externa_atual = max(200, self.TEMPERATURA_NIVEL_DO_MAR - altitude * 0.0065)

            # Adicionar desvios aleatórios
            # altitude += random.uniform(-500, 500)
            velocidade += random.uniform(-1, 1)
            velocidade_x += random.uniform(-1, 1)
            aceleracao += random.uniform(-0.1, 0.1)
            forca += random.uniform(-0.01, 0.01)
            pressao_atual += random.uniform(-50, 50)
            temperatura_atual += random.uniform(-2, 2)
            temperatura_motor_atual += random.uniform(-2, 2)
            temperatura_externa_atual += random.uniform(-1, 1)
            qualidade_atual += random.uniform(-0.5, 0.5)
            oxigenio_atual += random.uniform(-0.1, 0.1)
            energia_atual += random.uniform(-50, 50)  # Adicionar desvios aleatórios à energia

            # Gerar alertas
            if temperatura_motor_atual > self.TEMPERATURA_MOTOR_MAXIMA:
                alertas.append({"alerta_nome": "Motor", "alerta_descricao": "Sobreaquecimento do motor!"})
            if qualidade_atual < 95:
                alertas.append({"alerta_nome": "Sinal", "alerta_descricao": "Qualidade do sinal baixa!"})
            if pressao_atual < 500:
                alerta += ["Pressão muito baixa!"]
                alertas.append({"alerta_nome": "Combustivel", "alerta_descricao": "Combustível esgotado prematuramente!"})
            if combustivel <= 0 and int(t) <= 900:
                alertas.append({"alerta_nome": "Combustivel", "alerta_descricao": "Combustível esgotado prematuramente!"})
            if oxigenio_atual < 18.0:
                alertas.append({"alerta_nome": "Oxigenio", "alerta_descricao": "Nível de oxigênio baixo!"})
            if combustivel <= 0 and estagio != "descida":
                alertas.append({"alerta_nome": "Combustivel", "alerta_descricao": "Combustível insuficiente para continuar"})

            # Armazenar valores
            parametros = {
                "altitude": altitude,
                "velocidade": velocidade,
                "velocidade_x": velocidade_x,
                "aceleracao": aceleracao,
                "forca_g": forca,
                "pressao_atual": pressao_atual,
                "temperatura_atual": temperatura_atual,
                "temperatura_motor_atual": temperatura_motor_atual,
                "temperatura_externa_atual": temperatura_externa_atual,
                "combustivel": combustivel,
                "qualidade_atual": qualidade_atual,
                "oxigenio_atual": oxigenio_atual,
                "energia_atual": energia_atual,
                "alerta": alertas
                }
            
            self.sender.send({"id_lancamento": self.id_lancamento, "tripulantes": dados_tripulantes, "nave": parametros})
            await asyncio.sleep(1)

            
