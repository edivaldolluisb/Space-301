import React, { ChangeEvent, useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/NewLaunch.css";

export default function NewLaunch() {
    const [tripulantes, setTripulantes] = useState(individuals);
    const [foguete, setFoguete] = useState(foguetes);

    const [selectedFoguete, setSelectedFoguete] = useState('');
    const [selectedTripulantes, setSelectedTripulantes] = useState<number[]>([]);
    const [showTripulantes, setShowTripulantes] = useState<boolean>(false);
    const [missionName, setMissionName] = useState("");
    const [launchDate, setLaunchDate] = useState("");
    const [launchLocation, setLaunchLocation] = useState("");

    const handleSubmit = () => {
        const novoLancamento = {
          missionName,
          launchDate,
          launchLocation,
          selectedFoguete,
          selectedTripulantes,
        };
    
        console.log("Novo lançamento registrado:", novoLancamento);
    
        // fetch("/api/v1/launches/new", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(novoLancamento),
        // });
      };

      const handleConfirmClick = (): void => {
        setShowTripulantes(!showTripulantes);
      };
    
      const handleCheckboxChange = (tripulanteId: number): void => {
        setSelectedTripulantes((prevSelected) =>
          prevSelected.includes(tripulanteId)
            ? prevSelected.filter((id) => id !== tripulanteId)
            : [...prevSelected, tripulanteId]
        );
      };
    
      const handleSave = (): void => {
        setShowTripulantes(!showTripulantes);
      };

    return (
        <div className="container">
            <Header/>
            <h1>Novo lançamento</h1>
            <section className="form-section">
            <label>
                <input
                type="text"
                placeholder="Nome da missão"
                value={missionName}
                onChange={(e) => setMissionName(e.target.value)}
                />
            </label>

            <label>
                <input
                type="date"
                placeholder="Data do lançamento"
                value={launchDate}
                onChange={(e) => setLaunchDate(e.target.value)}
                />
            </label>

            <label>
                <input
                type="text"
                placeholder="Local do lançamento"
                value={launchDate}
                onChange={(e) => setLaunchLocation(e.target.value)}
                />
            </label>

            <label>
                <select
                value={selectedFoguete}
                onChange={(e) => setSelectedFoguete(e.target.value)}
                >
                <option value="">Selecionar foguete</option>
                {foguete.map((foguete) => (
                    <option key={foguete.id} value={foguete.id}>
                    {foguete.nome}
                    </option>
                ))}
                </select>
            </label>

            <label>
                <span>{selectedTripulantes.length} tripulante(s) adicionado(s)</span>
                <button className="tribulantesButton" onClick={handleConfirmClick}>
                Confirmar tripulantes →
                </button>

                {showTripulantes && (
                    <div>
                    <h4>Selecionar tripulantes</h4>
                    {tripulantes.map((tripulante) => (
                        <div key={tripulante.id} style={{ marginBottom: "5px" }}>
                        <label>
                            <input
                            type="checkbox"
                            checked={selectedTripulantes.includes(tripulante.id)}
                            onChange={() => handleCheckboxChange(tripulante.id)}
                            />
                            {tripulante.nome}
                        </label>
                        </div>
                    ))}
                    <button onClick={handleSave}>Salvar Seleção</button>
                    </div>
                )}
            </label>

            <button className="register-button" onClick={handleSubmit} >Registar lançamento</button>
            </section>
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

const foguetes = [
    {
        id: 1,
        nome: 'Falcon 9'
    },
    {
        id: 2,
        nome: 'Starship'
    },
    {
        id: 3,
        nome: 'Ariane 5'
    }
];