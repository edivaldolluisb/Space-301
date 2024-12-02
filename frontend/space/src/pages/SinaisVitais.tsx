import React, {useEffect, useState} from 'react';
import ParametroVital from '../components/ParametroVital';
import Profile from '../components/Profile';
import '../styles/sinaisvitais.css';
import {api} from '../lib/axios';
import {DestinationAndDateHeader} from '../components/destination-and-date-header';
import { Client } from '@stomp/stompjs';

type Alerta = {
    parametro: string;
    nome_alerta: string;
  };
  
  type Tripulante = {
    id: number;
    pa_sistolica: number;
    pa_diastolica: number;
    oxigenio_sangue: number;
    bpm: number;
    respiracao: number;
    alertas: Alerta[];
  };
  
  type Nave = {
    altitude: number;
    velocidade: number;
    velocidade_x: number;
    aceleracao: number;
    forca_g: number;
    pressao_atual: number;
    temperatura_atual: number;
    temperatura_motor_atual: number;
    temperatura_externa_atual: number;
    combustivel: number;
    qualidade_atual: number;
    oxigenio_atual: number;
    energia_atual: number;
    alerta: any[];
  };
  
  type Message = {
    id_lancamento: string;
    tripulantes: Tripulante[];
    nave: Nave;
  };

export default function SinaisVitais() {
    const [currentAstronautId, setCurrentAstronautId] = useState(individuals[0].id);
    const [currentAstronaut, setCurrentAstronaut] = useState(individuals[currentAstronautId]);
    const [astronauts, setAstronauts] = useState(individuals);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const client = new Client({
          brokerURL: 'ws://localhost:8080/space-websocket', // URL do WebSocket
          reconnectDelay: 5000, // Tenta reconectar após falhas
          onConnect: () => {
            console.log('Conectado ao WebSocket');
            client.subscribe('/topic/launch-data', (msg) => {
              console.log('Mensagem recebida do WebSocket:', msg); // Inspecionar a mensagem
              const data = JSON.parse(msg.body); // Parse do payload
              console.log('Dados processados:', data);
              setAstronauts((prevAstronauts) =>
                prevAstronauts.map((astronaut) => {
                    const updated = data.find((t) => t.id === astronaut.id);
                    if (updated) {
                        return {
                            ...astronaut,
                            parametros: [
                                {
                                    name: 'Batimento Cardíaco',
                                    valor: updated.bpm,
                                    unidade: 'bpm',
                                    status: updated.bpm > 100 ? 'Alto' : 'Normal',
                                },
                                {
                                    name: 'Pressão Sanguinea',
                                    pa_diastolica: updated.pa_diastolica,
                                    pa_sistolica: updated.pa_sistolica,
                                    unidade: '/ mmHg',
                                    status:
                                        updated.pa_sistolica > 140 || updated.pa_diastolica > 90
                                            ? 'Alta'
                                            : 'Normal',
                                },
                                {
                                    name: 'Oxigênio no Sangue',
                                    valor: updated.oxigenio_sangue,
                                    unidade: 'mol/m³',
                                    status: updated.oxigenio_sangue < 7.5 ? 'Baixo' : 'Normal',
                                },
                                {
                                    name: 'Ritmo Respiratório',
                                    valor: updated.respiracao,
                                    unidade: 'rpm',
                                    status: updated.respiracao > 20 ? 'Alto' : 'Normal',
                                },
                                {
                                    name: 'Temperatura corporal',
                                    valor: updated.temperature,
                                    unidade: 'ºc',
                                    status: 'Normal'
                                },
                            ],
                        };
                    }
                    return astronaut;
                    })
                );
            });
          },
          onDisconnect: () => {
            setError("Desconectado do WebSocket");
            console.log('Desconectado do WebSocket');
          },
        });
      
        client.activate();
      
        return () => {
          client.deactivate();
        };
      }, []);
      


    if (error) {
        setAstronauts(individuals);
        console.log(`Ocorreu um erro ao carregar os dados...${error}`);
    }

    useEffect(() => {
        setCurrentAstronaut(astronauts.filter((astronaut) => astronaut.id == currentAstronautId)[0]);
    });
    
    return (
        <>
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <DestinationAndDateHeader />

            <main className="flex gap-16 px-4">
                <div className="flex-1 space-y-6">
                <div className="content">
                <div className='target-astronaut'>
                    <h1 className='astronaut-name'>{currentAstronaut.name}</h1>
                    <h2>Informações pessoais</h2>
                    <div className='personal-info'>
                        <div className='info'>
                            <span className='info-name'>Gênero</span> <span className='info-value'>{currentAstronaut.gender}</span>
                        </div>
                        <div className='info'>
                            <span className='info-name'>Altura</span> <span className='info-value'>{currentAstronaut.height} cm</span>
                        </div>
                        <div className='info'>
                            <span className='info-name'>Idade</span> <span className='info-value'>{currentAstronaut.age}</span>
                        </div>
                        <div className='info'>
                            <span className='info-name'>Peso</span> <span className='info-value'>{currentAstronaut.weight} Kg</span>
                        </div>
                        <div className='info'>
                            <span className='info-name'>BMI</span> <span className='info-value'>{currentAstronaut.weight/Math.pow(currentAstronaut.height/100, 2)}</span>
                        </div>
                    </div>
                    <div className='parametros'>
                        {currentAstronaut.parametros ? currentAstronaut.parametros.map((parametro, index) => <ParametroVital
                                                        key={index}
                                                        nome={parametro.name}
                                                        valor={parametro.valor}
                                                        pa_diastolica={parametro.pa_diastolica}
                                                        pa_sistolica={parametro.pa_sistolica}
                                                        unidade={parametro.unidade}
                                                        status={parametro.status} />)
                                                    : 'None'}
                    </div>
                    </div>
                    <div className='astronauts-list'>
                        <h2>Astronautas</h2>
                        {astronauts.map((astronaut) => <Profile photo={astronaut.photo}
                                                            key={astronaut.id}
                                                            id={astronaut.id}
                                                            name={astronaut.name}
                                                            setAstronaut={setCurrentAstronautId} 
                                                            isActive={currentAstronautId === astronaut.id} />)}
                    </div>
                </div>
                </div>
            </main>
            </div>
        </>
    )
}

interface VitalParameter {
    name: string;
    valor: number|null;
    pa_diastolica: number| null;
    pa_sistolica: number|null;
    unidade: string;
    status: string;
}

interface Astronaut {
    id: number;
    name: string;
    gender: string;
    age: number;
    photo: '../../public/Neil_Armstrong.webp',
    height: number;
    weight: number;
    heartRate: number;
    pa_diastolica: number;
    pa_sistolica: number;
    bodyTemperature: number;
    respiratoryRate: number;
    parametros?: VitalParameter[];
}

// Para testes
const individuals = [
    {
        id: 1,
        name: 'Amelia Earhart',
        gender: 'Feminino',
        height: 165,
        age: 39,
        weight: 60,
        photo: '../../public/Amelia_Earhart.webp',
        parametros: [
            {
                name: 'Batimento Cardíaco',
                valor: null,
                unidade: 'bpm',
                status: 'Normal'
            },
            {
                name: 'Pressão Sanguinea',
                pa_diastolica:  null,
                pa_sistolica: null,
                unidade: ' mmhg',
                status: 'Normal'
            },
            {
                name: 'Temperatura corporal',
                valor: null,
                unidade: 'ºc',
                status: 'Normal'
            },
            {
                name: 'Ritmo respiratório',
                valor: null,
                unidade: 'rpm',
                status: 'Normal'
            },
        ]
    },
    {
        id: 2,
        name: 'Neil Armstrong',
        gender: 'Masculino',
        height: 180,
        age: 39,
        weight: 75,
        photo: '../../public/Neil_Armstrong.webp',
        parametros: [
            {
                name: 'Batimento Cardíaco',
                valor: null,
                unidade: 'bpm',
                status: 'Normal'
            },
            {
                name: 'Pressão Sanguinea',
                pa_diastolica: null,
                pa_sistolica: null,
                unidade: ' mmhg',
                status: 'Normal'
            },
            {
                name: 'Temperatura corporal',
                valor: null,
                unidade: 'ºc',
                status: 'Normal'
            },
            {
                name: 'Ritmo respiratório',
                valor: null,
                unidade: 'rpm',
                status: 'Normal'
            },
        ]
    },
    {
        id: 3,
        name: 'Katherine Johnson',
        gender: 'Feminino',
        height: 160,
        age: 50,
        weight: 62,
        photo: '../../public/Katherine_Johnson.webp',
        parametros: [
            {
                name: 'Batimento Cardíaco',
                valor: null,
                unidade: 'bpm',
                status: 'Normal'
            },
            {
                name: 'Pressão Sanguinea',
                pa_diastolica: null,
                pa_sistolica: null,
                unidade: ' mmhg',
                status: 'Normal'
            },
            {
                name: 'Temperatura corporal',
                valor: null,
                unidade: 'ºc',
                status: 'Normal'
            },
            {
                name: 'Ritmo respiratório',
                valor: null,
                unidade: 'rpm',
                status: 'Normal'
            },
        ]
    },
    {
        id: 4,
        name: 'Buzz Aldrin',
        gender: 'Masculino',
        height: 175,
        age: 40,
        weight: 78,
        photo: '../../public/Buzz_Aldrin.webp',
        parametros: [
            {
                name: 'Batimento Cardíaco',
                valor: null,
                unidade: 'bpm',
                status: 'Normal'
            },
            {
                name: 'Pressão Sanguinea',
                pa_diastolica: null,
                pa_sistolica: null,
                unidade: ' mmhg',
                status: 'Normal'
            },
            {
                name: 'Temperatura corporal',
                valor: null,
                unidade: 'ºc',
                status: 'Normal'
            },
            {
                name: 'Ritmo respiratório',
                valor: null,
                unidade: 'rpm',
                status: 'Normal'
            },
        ]
    }
];
