import React from 'react';
import ParametroVital from '../components/ParametroVital';
import Profile from '../components/Profile';
import '../styles/sinaisvitais.css';

export default function SinaisVitais() {
    return (
        <div className='main-content'>
            <div className="content">
                <div className='target-astronaut'>
                    <h1 className='astronaut-name'>{target.nome}</h1>
                    <h2>Informações pessoais</h2>
                    <div className='personal-info'>
                        <div className='info'>
                            <span className='info-name'>Gênero</span> <span className='info-value'>{target.genero}</span>
                        </div>
                        <div className='info'>
                            <span className='info-name'>Altura</span> <span className='info-value'>{target.altura} cm</span>
                        </div>
                        <div className='info'>
                            <span className='info-name'>Idade</span> <span className='info-value'>{target.idade}</span>
                        </div>
                        <div className='info'>
                            <span className='info-name'>Peso</span> <span className='info-value'>{target.peso} Kg</span>
                        </div>
                        <div className='info'>
                            <span className='info-name'>BMI</span> <span className='info-value'>{target.peso/Math.pow(target.altura/100, 2)}</span>
                        </div>
                    </div>
                    <div className='parametros'>
                        {target.parametros.map((parametro, index) => <ParametroVital
                                                        key={index}
                                                        nome={parametro.nome}
                                                        valor={parametro.valor}
                                                        unidade={parametro.unidade}
                                                        status={parametro.status} />)}
                    </div>
                </div>
                <div className='astronauts-list'>
                    <h2>Astronautas</h2>
                    {astronauts.map((astronaut, index) => <Profile photo={astronaut.photo}
                                                          key={index}
                                                          name={astronaut.nome} />)}
                </div>
            </div>
        </div>
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