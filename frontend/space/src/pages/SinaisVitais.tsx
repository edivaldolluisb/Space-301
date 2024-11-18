import React, {useEffect, useState} from 'react';
import ParametroVital from '../components/ParametroVital';
import Profile from '../components/Profile';
import '../styles/sinaisvitais.css';
import {api} from '../lib/axios';
import {DestinationAndDateHeader} from '../components/destination-and-date-header';

export default function SinaisVitais() {
    const [currentAstronautId, setCurrentAstronautId] = useState(individuals[0].id);
    const [currentAstronaut, setCurrentAstronaut] = useState(individuals[currentAstronautId]);
    const [astronauts, setAstronauts] = useState(individuals);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAstronauts = async () => {
        try {
            const response = await api.get('/launches');
            const astronautsList: Astronaut[] = response.data[0].astronauts.map((astronaut: Astronaut) => ({
                ...astronaut,
                parametros: [
                    {
                        name: 'Batimento Cardíaco',
                        valor: astronaut.heartRate.toFixed(2),
                        unidade: 'bpm',
                        status: 'Normal',
                    },
                    {
                        name: 'Pressão Sanguinea',
                        valor: astronaut.bloodPressure.toFixed(2),
                        unidade: '/ 80 mmhg',
                        status: 'Normal',
                    },
                    {
                        name: 'Temperatura corporal',
                        valor: astronaut.bodyTemperature.toFixed(2),
                        unidade: 'ºc',
                        status: 'Normal',
                    },
                    {
                        name: 'Ritmo respiratório',
                        valor: astronaut.respiratoryRate.toFixed(2),
                        unidade: 'rpm',
                        status: 'Normal',
                    },
                ],
            }));
            setAstronauts(astronautsList);
            console.log(astronautsList);
        } catch (err) {
            setError('Erro ao buscar os dados dos astronautas');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        setAstronauts(individuals);
        console.log(`Ocorreu um erro ao carregar os dados...${error}`);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchAstronauts();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setCurrentAstronaut(astronauts.filter((astronaut) => astronaut.id == currentAstronautId)[0]);
    });

    if (loading) {
        return <h1>Loading...</h1>;
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
    valor: number;
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
    bloodPressure: number;
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
                valor: 92,
                unidade: 'bpm',
                status: 'Normal'
            },
            {
                name: 'Pressão Sanguinea',
                valor: 110,
                unidade: '/ 70 mmhg',
                status: 'Normal'
            },
            {
                name: 'Temperatura corporal',
                valor: 36.8,
                unidade: 'ºc',
                status: 'Normal'
            },
            {
                name: 'Ritmo respiratório',
                valor: 18,
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
                valor: 85,
                unidade: 'bpm',
                status: 'Normal'
            },
            {
                name: 'Pressão Sanguinea',
                valor: 120,
                unidade: '/ 80 mmhg',
                status: 'Normal'
            },
            {
                name: 'Temperatura corporal',
                valor: 36.9,
                unidade: 'ºc',
                status: 'Normal'
            },
            {
                name: 'Ritmo respiratório',
                valor: 16,
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
                valor: 78,
                unidade: 'bpm',
                status: 'Normal'
            },
            {
                name: 'Pressão Sanguinea',
                valor: 118,
                unidade: '/ 75 mmhg',
                status: 'Normal'
            },
            {
                name: 'Temperatura corporal',
                valor: 36.5,
                unidade: 'ºc',
                status: 'Normal'
            },
            {
                name: 'Ritmo respiratório',
                valor: 17,
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
                valor: 90,
                unidade: 'bpm',
                status: 'Normal'
            },
            {
                name: 'Pressão Sanguinea',
                valor: 115,
                unidade: '/ 75 mmhg',
                status: 'Normal'
            },
            {
                name: 'Temperatura corporal',
                valor: 37.1,
                unidade: 'ºc',
                status: 'Normal'
            },
            {
                name: 'Ritmo respiratório',
                valor: 19,
                unidade: 'rpm',
                status: 'Normal'
            },
        ]
    }
];
