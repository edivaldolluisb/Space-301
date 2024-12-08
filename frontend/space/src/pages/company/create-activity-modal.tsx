import { Calendar, X, Loader2, Rocket, MapPin } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"


interface ConfirmLaunchModalProps {
	closeCreateLaunchModal: () => void;
	createLaunch: (event: FormEvent<HTMLFormElement>) => void;
	setMissionName: (name: string) => void;
	setLaunchDate: (date: string) => void;
	setRocketId: (id: string) => void;
	setAddress: (address: string) => void;
	setAstronauts: (astronauts: Astronaut[]) => void;
	error: string | null;
	isLoading: boolean;
}

interface Astronaut {
	id: number;
}

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

export function CreateActivityModal({
  closeCreateActivityModal
}: CreateActivityModalProps) {
  const { tripId } = useParams()
  const [rocketId, setRocketId] = useState('');
  const [selectedCrew, setSelectedCrew] = useState<number[]>([]);
  const [showCrew, setShowCrew] = useState(false);
  const [crew, setCrew] = useState(individuals);

	closeCreateLaunchModal,
	createLaunch,
	setMissionName,
	setLaunchDate,
	setRocketId,
	setAddress,
	setAstronauts,
	error,
	isLoading,
}: ConfirmLaunchModalProps) {


	const [selectedAstronauts, setSelectedAstronauts] = useState<Astronaut[]>([]);
	const [astronaustsList, setAstronautsList] = useState([]);
	const fetchAstronautas = async () => {
		try {
		  const response = await api.get('/astronauts');
		  return response.data
	
		} catch (error) {
		  console.log("Erro ao buscar lançamentos:", error)
		  return null
		}
	
	  }

	useState(() => {
		const fetchAstro = async () => {
			const res = await fetchAstronautas();
			console.log(`Astros: ${res}`)
			setAstronautsList(res);
		}
		fetchAstro();
	});

    const missionName = data.get('mission')?.toString()
    const launchDate = new Date(data.get('date')?.toString() || "").toISOString();
    const launchLocation = data.get('location')?.toString()

    if (!missionName || !launchDate || !launchLocation || !rocketId) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }
    const launch = {   
      "missionName": missionName,
      "launchDate": launchDate,
      "rocketId": Number(rocketId),
      "address": launchLocation,
      "astronauts":selectedCrew
    }
    try {
      console.log(launch)
      const result = await api.post(`/launches`, launch);
      console.log(result)
      closeCreateActivityModal();
    } catch (error) {
      console.error("Erro ao criar lançamento:", error);
      alert("Não foi possível criar o lançamento. Tente novamente.");
    }
  }

  // const handleConfirmClick = (): void => {
  //   setShowCrew(!showCrew);
  // };

  const handleCheckboxChange = (tripulanteId: number): void => {
    setSelectedCrew((prevSelected) =>
      prevSelected.includes(tripulanteId)
        ? prevSelected.filter((id) => id !== tripulanteId)
        : [...prevSelected, tripulanteId]
    );
  };

  // const handleSave = (): void => {
  //   setShowCrew(false);
  // };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Cadastrar Lançamento</h2>
            <button onClick={closeCreateActivityModal} aria-label="Fechar modal">
              <X className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Indicar todos os dados do lançamentos.
          </p>
        </div>
        
        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              name="mission"
              placeholder="Nome da missão"
              aria-label="Nome da missão"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Calendar className="text-zinc-400 size-5" />
            <input
              type="datetime-local"
              name="date"
              placeholder="Data do lançamento"
              aria-label="Data do lançamento"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <input
              name="location"
              placeholder="Local do lançamento"
              aria-label="Local do lançamento"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <select
              value={rocketId}
              onChange={(e) => setRocketId(e.target.value)}
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              >
              <option value="" className="bg-transparent text-lg-zinc-400 outline-none flex-1">Selecionar foguete</option>
              {foguetes.map((foguete) => (
                  <option key={foguete.id} value={foguete.id}>
                  {foguete.nome}
                  </option>
              ))}
              </select>
          </div>

          <div className="px-4 h-16 rounded-xl bg-zinc-700 shadow-shape flex items-center justify-between">
            <span>{selectedCrew.length} tripulante(s) adicionado(s)</span>
            {/* <Button onClick={handleConfirmClick}>Confimar Tripulantes</Button> */}          
          </div>
          <div>
              <h4>Selecionar tripulantes</h4>
              <div>
                {crew.map((tripulante) => (
                  <div key={tripulante.id} className="flex items-center gap-3">
                    <img src={tripulante.photo} alt={tripulante.nome} className="w-10 h-10 rounded-full" />
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedCrew.includes(tripulante.id)}
                        onChange={() => handleCheckboxChange(tripulante.id)}
                      />
                      {tripulante.nome}
                    </label>
                  </div>
                ))}
              </div>
              {/* <Button onClick={handleSave}>Salvar Seleção</Button> */}
            </div>

          <Button size="full" type="submit">
            Salvar lançamento
          </Button>
        </form>
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

	const handleCheckboxChange = (astronaut: Astronaut) => {
		const updatedAstronauts = selectedAstronauts.some((item) => item.id === astronaut.id)
			? selectedAstronauts.filter((item) => item.id !== astronaut.id)
			: [...selectedAstronauts, astronaut];

		setSelectedAstronauts(updatedAstronauts);
		setAstronauts(updatedAstronauts);
	};



	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
			<div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<h2 className="font-lg font-semibold">Registar Lançamento</h2>
						<button>
							<X className="size-5 text-zinc-400" onClick={closeCreateLaunchModal} />
						</button>
					</div>

					<p className="text-sm text-zinc-400">
						Preencha os detalhes do lançamento para prosseguir.
					</p>
				</div>

				{error && (
					<div className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg text-sm">
						{error}
					</div>
				)}

				<form onSubmit={createLaunch} className="space-y-3">
					<div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
						<Rocket className="text-zinc-400 size-5" />
						<input
							type="text"
							name="missionName"
							placeholder="Nome da missão"
							className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
							onChange={(event) => setMissionName(event.target.value)}
							disabled={isLoading}
							// required
						/>
					</div>

					<div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
						<Calendar className="text-zinc-400 size-5" />
						<input
							type="datetime-local"
							name="launchDate"
							placeholder="Nome da missão"
							className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
							onChange={(event) => setLaunchDate(event.target.value)}
							disabled={isLoading}
							// required
						/>
					</div>


					<div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
						<MapPin className="text-zinc-400 size-5" />
						<input
							type="text"
							name="address"
							placeholder="Endereço do Local de Lançamento"
							className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
							onChange={(event) => setAddress(event.target.value)}
							disabled={isLoading}
							// required
						/>
					</div>

					<Select onValueChange={setRocketId} defaultValue="1">
						<SelectTrigger className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
							<SelectValue placeholder="Selecionar o foguete  " />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1">Falcon 9</SelectItem>
							<SelectItem value="2">Starship</SelectItem>
							<SelectItem value="3">Ariane 5</SelectItem>
						</SelectContent>
					</Select>

					<ScrollArea className="h-72	px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
						<div className="p-4">
							<h4 className="mb-4 text-sm font-medium leading-none">Austronautas</h4>
							{astronaustsList.map((astronaut) => (
								<>
									<div className="flex items-center space-x-3 mb-3">
										<Checkbox key={astronaut.id} value={astronaut.id}
											id={`checkbox-${astronaut.id}`}
											checked={selectedAstronauts.some((item) => item.id === astronaut.id)}
											onCheckedChange={() => handleCheckboxChange(astronaut)}
										/>
										<label
											htmlFor={`checkbox-${astronaut.id}`}
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											{astronaut.name}
										</label>
									</div>
								</>
							))}

						</div>
					</ScrollArea>

					<Button
						type="submit"
						size="full"
						// disabled={isLoading}
						className="flex items-center justify-center gap-2"
					>
						{isLoading ? (
							<>
								<Loader2 className="size-4 animate-spin" />
								Registrando...
							</>
						) : (
							"Registrar Lançamento"
						)}
						{/* Registrar Lançamento */}
					</Button>
				</form>

			</div>
		</div>
	)
}
