import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "../../components/destination-and-date-header";

import { api } from "../../lib/axios";



interface Astronaut {
	id: number;
}

interface Launch {
  missionName: string;
  launchDate: string;
  rocketId: number | string | null;
  address: string;
  status: string;
  astronauts: Astronaut[];
}

export function DashboardPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)
  
	const [missionName, setMissionName] = useState('');
	const [launchDate, setLaunchDate] = useState('');
	const [rocketId, setRocketId] = useState<number | string | null>(null);
	const [address, setAddress] = useState('');
	const [status, setStatus] = useState('PENDING');
	const [astronauts, setAstronauts] = useState<Astronaut[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateLaunchModal() {
    setIsCreateActivityModalOpen(false)
  }

  // create a new launch
  async function createLaunch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setIsLoading(true);

    // check if date is valid
    const date = new Date(launchDate);
    const currentDate = new Date();
    if (date < currentDate) {
      console.error('A data introduzida é menor do que a data atual:', date, currentDate);
      setError('A data introduzida é menor do que a data atual');
      setIsLoading(false);
      return;
    }

    // check if at least one astronaut is selected
    if (!astronauts.length) {
      setError('Selecione pelo menos um astronauta');
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
      const Austronauts: Astronaut[] = astronauts.map((astronaut) => {
        return {
          id: astronaut.id,
        };
      });

      const NewlaunchData: Launch = {
        missionName,
        launchDate: new Date(launchDate).toISOString(),
        rocketId,
        address,
        status,
        astronauts: Austronauts,
      };

      console.log('Dados do lançamento:', NewlaunchData);
      const response = await api.post('/launches', NewlaunchData);

      console.log('Lançamento registrado com sucesso:', response.data);
      closeCreateLaunchModal();
      // Aqui você pode atualizar a lista de lançamentos no estado, se necessário.
    } catch (error) {
      console.error('Erro ao registrar lançamento:', error);
      alert('Falha ao registrar o lançamento. Verifique os dados e tente novamente.');
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

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks />

          <div className="w-full h-px bg-zinc-800" />

          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal 
          closeCreateLaunchModal={closeCreateLaunchModal}
          setMissionName={setMissionName}
          setLaunchDate={setLaunchDate}
          setRocketId={setRocketId}
          setAddress={setAddress}
          setAstronauts={setAstronauts}
          createLaunch={createLaunch}

        />
      )}
    </div>
  )
}