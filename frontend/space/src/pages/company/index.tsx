import { CircleCheckBig, Plus } from "lucide-react";
import { FormEvent, useState, } from "react";
import { CreateLaunchComponent } from "./CreateLaunchComponent";
import { RecentAlerts } from "./RecentAlerts";
import { RecentHistory } from "./RecentHistory";
import { ListLaunches } from "./ListLaunches";
import { DestinationAndDateHeader } from "../../components/destination-and-date-header";

import { api } from "../../lib/axios";

import { useToast } from "@/components/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

import { Launch } from "./types";


interface Astronaut {
	id: number;
}

export function DashboardPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)
  
	const [missionName, setMissionName] = useState('');
	const [launchDate, setLaunchDate] = useState('');
	const [rocketId, setRocketId] = useState<number | string | null>(null);
	const [address, setAddress] = useState('');
  const [status, setStatus] = useState<'PENDING' | 'LAUNCHED' | 'SUCCESS' | 'FAILED'>('PENDING');
	const [astronauts, setAstronauts] = useState<Astronaut[]>([]);
  
  const [launches, setLaunches] = useState<Launch[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast()

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateLaunchModal() {
    setMissionName('');
		setLaunchDate('');
		setRocketId(null);
		setAddress('');
		setAstronauts([]);
    setError(null);
    setIsCreateActivityModalOpen(false)
  }

  // create a new launch
  async function createLaunch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setIsLoading(true);
    setStatus('PENDING');

    // check if date is valid
    const date = new Date(launchDate);
    const currentDate = new Date();
    if (date < currentDate) {
      console.error('A data introduzida é menor do que a data atual:', date, currentDate);
      setError('A data introduzida é menor do que a data atual');
      setIsLoading(false);
      return;
    }

    // select only 4 astronauts
    if (astronauts.length !== 4) {
      setError('Selecione 4 astronautas');
      setIsLoading(false);
      return;
    }

    if (!missionName || !launchDate || !rocketId || !address) {
      setError('Todos os campos são obrigatórios');
      setIsLoading(false);
      console.error('Todos os campos são obrigatórios:', missionName, launchDate, rocketId, address);
      return;
    }
    console.log('Criando lançamento...');
  
    try {
      // return an array of ids
      const astronautsIds = astronauts.map((astronaut) => astronaut.id);
      // @ts-expect-error - I don't need to pass the id here
      const NewlaunchData: Launch = {
        missionName,
        launchDate: new Date(launchDate).toISOString(),
        rocketId: Number(rocketId),
        address,
        status,
        // array of ids
        astronauts: astronautsIds
      };

      console.log('Dados do lançamento:', NewlaunchData);
      const response = await api.post('/launches', NewlaunchData);

      const newLaunch = response.data;
      console.log('Lançamento registrado com sucesso:', newLaunch);        
      toast({
        title: "Sucesso.",
        description: "Lançamento registrado com sucesso.",
        action:<CircleCheckBig className="size-5 text-lime-300" />,
        
      });

      setIsLoading(false);
      closeCreateLaunchModal();
      setLaunches([...launches, newLaunch]);
      // Aqui você pode atualizar a lista de lançamentos no estado, se necessário.
    } catch (error) {
      console.error('Erro ao registrar lançamento:', error);
      toast({
        title: "Erro:",
        description: "Erro ao registrar lançamento",
        variant: "destructive",
      });
    }
  }
  

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Lançamentos</h2>

            <button onClick={openCreateActivityModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
              <Plus className="size-5" />
              Cadastrar lançamento
            </button>
          </div>

          <ListLaunches  launches={launches} />
        </div>

        <div className="w-80 space-y-6">
          <RecentAlerts />

          <div className="w-full h-px bg-zinc-800" />

          <RecentHistory />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateLaunchComponent 
          closeCreateLaunchModal={closeCreateLaunchModal}
          setMissionName={setMissionName}
          setLaunchDate={setLaunchDate}
          setRocketId={setRocketId}
          setAddress={setAddress}
          setAstronauts={setAstronauts}
          createLaunch={createLaunch}
          error={error}
          isLoading={isLoading}

        />
      )}
      <Toaster />
    </div>
  )
}