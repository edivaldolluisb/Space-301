import { CheckCircle2, X, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { api } from "../../lib/axios";
import { Link } from "react-router-dom";

interface Participant {
  id: string;
  name: string | null;
  date: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams()
  const [launches, setLaunches] = useState<Participant[]>([])

  useEffect(() => {
    // api.get(`trips/${tripId}/launch`).then(response => setParticipants(response.data.launch))

    const Launches = [
      {
        id: "1",
        name: "Thunderbolt",
        date: "10 de Setembro",
        is_confirmed: true
      },
      {
        id: "2",
        name: "Neptune",
        date: "10 de Julho",
        is_confirmed: false
      },
      {
        id: "3",
        name: "Neptune",
        date: "12 de Julho",
        is_confirmed: false
      },
    ]
    setLaunches(Launches)
  }, [tripId])


  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Histórico de lançamentos</h2>

      <div className="space-y-5">
        {launches.map((launch, index) => (
          <div key={launch.id} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{launch.name ?? `Convidado ${index}`}</span>
              <span className="block text-sm text-zinc-400 truncate">
                {launch.date}
              </span>
            </div>

            {launch.is_confirmed ? (
              <CheckCircle2 className="text-green-400 size-5 shrink-0" />
            ) : (
              <X className="text-red-400 size-5 shrink-0" />
            )}
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