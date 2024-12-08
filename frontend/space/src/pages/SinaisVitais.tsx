import React, {useEffect, useState} from 'react';
import ParametroVital from '../components/ParametroVital';
import Profile from '../components/Profile';
import '../styles/sinaisvitais.css';
import {api} from '../lib/axios';
import {DestinationAndDateHeader} from '../components/destination-and-date-header';
import { Client } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';

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
    const [astronauts, setAstronauts] = useState([]);
    const [currentAstronautId, setCurrentAstronautId] = useState();
    const [currentAstronaut, setCurrentAstronaut] = useState();
    const [error, setError] = useState<string | null>(null);
    const { launchId } = useParams();

    useEffect(() => {
        const fetchAstronauts = async () => {
            try {
                const response = await api.get(`/launches/${launchId}/astronauts`);
                console.log('resp - astronautas: ', response.data);   
                const data = response.data;
                const astros = data.map((astro) => {return {...astro, 'parametros': []}}); 
                setAstronauts(astros);
                setCurrentAstronaut(astronauts[0]);
                setCurrentAstronautId(currentAstronaut.id);
                console.log('Current - astronautas: ', currentAstronaut);
            } catch (error) {
                console.error('Erro ao buscar astronautas:', error);
            }
        };
    
        fetchAstronauts();
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        const client = new Client({
          brokerURL: 'ws://localhost:8080/space-websocket',
          reconnectDelay: 5000,
          onConnect: () => {
            console.log(`Conectado ao WebSocket: /topic/${launchId}/astronaut-data/${currentAstronautId}`);
            client.subscribe(`/topic/${launchId}/astronaut-data/${currentAstronautId}`, (msg) => {
              console.log('Mensagem recebida do WebSocket:', msg);
              const data = JSON.parse(msg.body);
              console.log('Dados processados:', data);
              
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

    if (!currentAstronaut) {
        console.log('logooo - astronautas: ', currentAstronaut);
        return <h1>A processar</h1>;
    }
    
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
