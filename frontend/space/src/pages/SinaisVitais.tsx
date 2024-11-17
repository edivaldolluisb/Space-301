import React, {useEffect, useState} from 'react';
import ParametroVital from '../components/ParametroVital';
import Profile from '../components/Profile';
import '../styles/sinaisvitais.css';

export default function SinaisVitais() {
    const [currentAstronautId, setCurrentAstronautId] = useState(individuals[0].id);
    const [currentAstronaut, setCurrentAstronaut] = useState(individuals[currentAstronautId]);
    useEffect(() => {
        setCurrentAstronaut(individuals.filter((astronaut) => astronaut.id == currentAstronautId)[0]);
    });
    return (
        <div className='main-content'>
            <div className="content">
                <div className='target-astronaut'>
                    <h1 className='astronaut-name'>{currentAstronaut.nome}</h1>
                    <h2>Informações pessoais</h2>
                    <div className='personal-info'>
                        <div className='info'>
                            <span className='info-name'>Gênero</span> <span className='info-value'>{currentAstronaut.genero}</span>
                        </div>
                        <div className='info'>
                            <span className='info-name'>Altura</span> <span className='info-value'>{currentAstronaut.altura} cm</span>
                        </div>
                        <div className='info'>
                            <span className='info-name'>Idade</span> <span className='info-value'>{currentAstronaut.idade}</span>
                        </div>
                        <div className='info'>
                            <span className='info-name'>Peso</span> <span className='info-value'>{currentAstronaut.peso} Kg</span>
                        </div>
                        <div className='info'>
                            <span className='info-name'>BMI</span> <span className='info-value'>{currentAstronaut.peso/Math.pow(currentAstronaut.altura/100, 2)}</span>
                        </div>
                    </div>
                    <div className='parametros'>
                        {currentAstronaut.parametros.map((parametro, index) => <ParametroVital
                                                        key={index}
                                                        nome={parametro.nome}
                                                        valor={parametro.valor}
                                                        unidade={parametro.unidade}
                                                        status={parametro.status} />)}
                    </div>
                </div>
                <div className='astronauts-list'>
                    <h2>Astronautas</h2>
                    {individuals.map((astronaut) => <Profile photo={astronaut.photo}
                                                          key={astronaut.id}
                                                          id={astronaut.id}
                                                          name={astronaut.nome}
                                                          setAstronaut={setCurrentAstronautId} />)}
                </div>
            </div>
        </div>
    )
}

const individuals = [
    {
        id: 1,
        nome: 'Amelia Earhart',
        genero: 'Feminino',
        altura: 165,
        idade: 39,
        peso: 60,
        photo: '../../public/Amelia_Earhart.webp',
        parametros: [
            {
                nome: 'Batimento Cardíaco',
                valor: 92,
                unidade: 'bpm',
                status: 'Normal'
            },
            {
                nome: 'Pressão Sanguinea',
                valor: 110,
                unidade: '/ 70 mmhg',
                status: 'Normal'
            },
            {
                nome: 'Temperatura corporal',
                valor: 36.8,
                unidade: 'ºc',
                status: 'Normal'
            },
            {
                nome: 'Ritmo respiratório',
                valor: 18,
                unidade: 'rpm',
                status: 'Normal'
            },
        ]
    },
    {
        id: 2,
        nome: 'Neil Armstrong',
        genero: 'Masculino',
        altura: 180,
        idade: 39,
        peso: 75,
        photo: '../../public/Neil_Armstrong.webp',
        parametros: [
            {
                nome: 'Batimento Cardíaco',
                valor: 85,
                unidade: 'bpm',
                status: 'Normal'
            },
            {
                nome: 'Pressão Sanguinea',
                valor: 120,
                unidade: '/ 80 mmhg',
                status: 'Normal'
            },
            {
                nome: 'Temperatura corporal',
                valor: 36.9,
                unidade: 'ºc',
                status: 'Normal'
            },
            {
                nome: 'Ritmo respiratório',
                valor: 16,
                unidade: 'rpm',
                status: 'Normal'
            },
        ]
    },
    {
        id: 3,
        nome: 'Katherine Johnson',
        genero: 'Feminino',
        altura: 160,
        idade: 50,
        peso: 62,
        photo: '../../public/Katherine_Johnson.webp',
        parametros: [
            {
                nome: 'Batimento Cardíaco',
                valor: 78,
                unidade: 'bpm',
                status: 'Normal'
            },
            {
                nome: 'Pressão Sanguinea',
                valor: 118,
                unidade: '/ 75 mmhg',
                status: 'Normal'
            },
            {
                nome: 'Temperatura corporal',
                valor: 36.5,
                unidade: 'ºc',
                status: 'Normal'
            },
            {
                nome: 'Ritmo respiratório',
                valor: 17,
                unidade: 'rpm',
                status: 'Normal'
            },
        ]
    },
    {
        id: 4,
        nome: 'Buzz Aldrin',
        genero: 'Masculino',
        altura: 175,
        idade: 40,
        peso: 78,
        photo: '../../public/Buzz_Aldrin.webp',
        parametros: [
            {
                nome: 'Batimento Cardíaco',
                valor: 90,
                unidade: 'bpm',
                status: 'Normal'
            },
            {
                nome: 'Pressão Sanguinea',
                valor: 115,
                unidade: '/ 75 mmhg',
                status: 'Normal'
            },
            {
                nome: 'Temperatura corporal',
                valor: 37.1,
                unidade: 'ºc',
                status: 'Normal'
            },
            {
                nome: 'Ritmo respiratório',
                valor: 19,
                unidade: 'rpm',
                status: 'Normal'
            },
        ]
    }
];
