import { CircleDashed, Rocket } from "lucide-react";
import { api, auth } from "../../lib/axios";
import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

import { Link } from "react-router-dom";
import { Launch, OrganizedLaunches } from "./types";
import { organizeLaunches } from "./utils/organizeLaunches";


export function ListLaunches({ launches }: { launches: Launch[] }) {

  const [organizedLaunches, setOrganizedLaunches] = useState<OrganizedLaunches>({})
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { authenticated } = auth.isAuthenticated();


  const fetchLaunches = async (): Promise<Launch[] | null> => {
    try {
      const endpoint = authenticated
        ? '/launches/active'
        : '/visitor/launches/active';

      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching launches:", error);
      setError("Unable to load launches. Please try again later.");
      return null;
    }
  };


  useEffect(() => {
    const loadLaunches = async () => {
      setIsLoading(true);
      try {
        const result = await fetchLaunches();

        if (result && result.length > 0) {
          setOrganizedLaunches(organizeLaunches(result));
        }
      } catch (err) {
        setError("Um erro inesperado ocorreu.");
        console.error("Error loading launches:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadLaunches();
  }, [launches]); // ou [authenticated]?


  const renderLaunchStatus = (status: string) => {
    return status === "PENDING"
      ? <CircleDashed className="size-5 text-gray-500" />
      : <Rocket className="size-5 text-lime-300" />;
  };

  return (
    <>
      {isLoading ? (
        <p className="text-zinc-500 text-sm">Carregando lançamentos...</p>
      ) : error ? (
        <p className="text-zinc-500 text-sm">{error}</p>
      ) : Object.keys(organizedLaunches).length > 0 ? (
        <>
          {
            Object.entries(organizedLaunches).map(([year, months]) => (
              <div key={year} className="space-y-8">
                {Object.entries(months).map(([month, monthLaunches]) => (
                  <div key={month} className="space-y-2.5">
                    <div className="flex gap-2 items-baseline">
                      <span className="text-xl text-zinc-300 font-semibold">{month} </span>
                      <span className="text-xs text-zinc-500">{year}</span>
                    </div>
                    {monthLaunches.length > 0 ? (
                      <div>
                        {monthLaunches.map(launch => (
                          <div key={launch.id} className="space-y-2.5 mb-2">

                            <Link to={`/rocket/${launch.id}`} className="">
                              <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                {renderLaunchStatus(launch.status)}
                                <span className="text-zinc-100">{launch.missionName}</span>
                                <span className="text-zinc-400 text-sm ml-auto">
                                  {format(launch.launchDate, "d' de 'LLLL  'às' HH'h'mm", { locale: pt })}
                                </span>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-zinc-500 text-sm">Nenhum lançamento cadastrado para essa data.</p>
                    )}
                  </div>
                ))}
              </div>
            ))
          }
        </>
      ) : (
        <p className="text-zinc-500 text-sm">Nenhum lançamento cadastrado.</p>
      )}
    </>

  )
}