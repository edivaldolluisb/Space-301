import React from 'react';
import ParametroVital from '../components/ParametroVital';
import Profile from '../components/Profile';

export default function SinaisVitais() {
    return (
        <>
            <div className="content">
                <div className='target-astronaut'>
                    <h1>{target.nome}</h1>
                    <h2>Informações pessoais</h2>
                    <div className='personal-info'>
                        <div className='info'>
                            <span>Gênero</span> <span>{target.genero}</span>
                        </div>
                        <div className='info'>
                            <span>Altura</span> <span>{target.altura} cm</span>
                        </div>
                        <div className='info'>
                            <span>Idade</span> <span>{target.idade}</span>
                        </div>
                        <div className='info'>
                            <span>Peso</span> <span>{target.peso} Kg</span>
                        </div>
                        <div className='info'>
                            <span>BMI</span> <span>{target.peso/Math.pow(target.altura/100, 2)}</span>
                        </div>
                    </div>
                    {target.parametros.map(parametro => <ParametroVital
                                                        nome={parametro.nome}
                                                        valor={parametro.valor}
                                                        unidade={parametro.unidade}
                                                        status={parametro.status} />)}
                </div>
                <div className='astronauts-list'>
                    <h2>Astronautas</h2>
                    {astronauts.map(astronaut => <Profile photo={astronaut.photo}
                                                          name={astronaut.nome} />)}
                </div>
            </div>
        </>
    )
}

const target = {
    nome: 'Robert James Fischer',
    genero: 'Masculino',
    altura: 170,
    idade: 45,
    peso: 72,
    parametros: [
        {
            photo:'',
            nome: 'Batimento Cardíaco',
            valor: 98,
            unidade: 'bpm',
            status: 'Normal'
        },
        {
            photo:'',
            nome: 'Pressão Sanguinea',
            valor: 102,
            unidade: '/ 72 mmhg',
            status: 'Normal'
        },
        {
            photo:'',
            nome: 'Temperatura corporal',
            valor: 37,
            unidade: 'ºc',
            status: 'Normal'
        },
        {
            photo:'',
            nome: 'Ritmo respiratório',
            valor: 15,
            unidade: 'rpm',
            status: 'Normal'
        },
    ]
}

const astronauts = [
    {
        photo: '',
        nome: 'Robert James Fischer',
    },
    {
        photo: '',
        nome: 'Robert James Fischer',
    },
    {
        photo: '',
        nome: 'Robert James Fischer',
    }
]