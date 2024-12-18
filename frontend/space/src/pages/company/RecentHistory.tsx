import { CheckCircle2, CircleX, UserCog } from "lucide-react";
import { Button } from "@/components/button";
import { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { Link } from "react-router-dom";

import { format } from "date-fns";
import { pt } from "date-fns/locale";


interface Astronaut {
  id: number;
}
interface Alert {
  id: number;
  message: string;
  date: string;
  status: string;
  launch: Launch | null;
}

interface Launch {
  id: number;
  missionName: string;
  launchDate: string;
  rocketId: number | string | null;
  address: string;
  status: string;
  astronauts: Astronaut[];
  alerts: Alert[];
}

export function RecentHistory() {
  const [launches, setLaunches] = useState<Launch[]>([])

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await api.get('/launches/completed');
        setLaunches(response.data)

        console.log("resultados de fetch da api", response.data)

      } catch (error) {
        console.error('Erro ao carregar atividades:', error);
      }
    }

    loadActivities();
  }, []);


  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Histórico de lançamentos</h2>

      <div className="space-y-5">
        {launches.slice(0, 4).map((launch, index) => (
          <div key={launch.id} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{launch.missionName ?? `Convidado ${index}`}</span>
              <span className="block text-sm text-zinc-400 truncate">
                {format(launch.launchDate, "d' de 'LLLL", { locale: pt })}
              </span>
            </div>

            {launch.status === "SUCCESS"
              ? <CheckCircle2 className="size-5 text-lime-500  shrink-0" />
              : <CircleX className="size-5 text-red-500  shrink-0" />
            }
          </div>
        ))}
      </div>

      <div>
        <Link to={"/history"} className="">
          <Button variant="secondary" size="full">
            <UserCog className="size-5" />
            Ver histórico completo
          </Button>
        </Link>
      </div>
    </div>
  )
}