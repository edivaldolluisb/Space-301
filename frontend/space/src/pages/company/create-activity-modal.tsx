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
	// error: string | null;
	// isLoading: boolean;
}

interface Astronaut {
	id: number;
}

export function CreateActivityModal({
	closeCreateLaunchModal,
	createLaunch,
	setMissionName,
	setLaunchDate,
	setRocketId,
	setAddress,
	setAstronauts,
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

				{/* {error && (
          <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )} */}

				<form onSubmit={createLaunch} className="space-y-3">
					<div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
						<Rocket className="text-zinc-400 size-5" />
						<input
							type="text"
							name="missionName"
							placeholder="Nome da missão"
							className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
							onChange={(event) => setMissionName(event.target.value)}
							// disabled={isLoading}
							required
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
							// disabled={isLoading}
							required
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
							// disabled={isLoading}
							required
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
						{/* {isLoading ? (
							<>
								<Loader2 className="size-4 animate-spin" />
								Registrando...
							</>
						) : (
							"Registrar Lançamento"
						)} */}
						Registrar Lançamento
					</Button>
				</form>

			</div>
		</div>
	)
}
