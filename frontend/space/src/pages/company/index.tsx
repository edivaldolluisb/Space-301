import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "../../components/destination-and-date-header";



interface Astronaut {
	id: number;
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
  
    const launchData = {
      missionName,
      launchDate,
      rocketId,
      address,
      status,
      astronauts,
    };
  
    try {
      // const response = await api.post('/launches', launchData);

      // console.log('Lançamento registrado com sucesso:', response.data);
      console.log('Lançamento registrado com sucesso:', launchData);
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