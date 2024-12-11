import { CircleCheck, CircleX, CircleFadingArrowUp, CircleDashed } from "lucide-react";
import { api } from "../../lib/axios";
import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

import { Link } from "react-router-dom";

interface Launch {
  id?: number;
  missionName: string;
  launchDate: string;
  rocketId: number | string | null;
  address: string;
  status: string;
  astronauts: number[];
}

export function Activities({ launches }: { launches: Launch[] }) {

  const [organizedLaunches, setOrganizedLaunches] = useState<{ [year: string]: { [month: string]: Launch[] } }>({})
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);



  const fetchLancamentos = async () => {
    try {
      const response = await api.get('/launches');
      return response.data

    } catch (error) {
      console.log("Erro ao buscar lançamentos:", error)
      setError("Não foi possível carregar os lançamentos. Tente novamente mais tarde.");
      return null
    }

  }

  function organizeLaunches(launches: Launch[]) {
    const organizedLaunches: { [year: string]: { [month: string]: Launch[] } } = {};
    launches.forEach(launch => {
      const date = new Date(launch.launchDate);
      const year = date.getFullYear().toString();
      const month = date.toLocaleString('default', { month: 'short' });

      if (!organizedLaunches[year]) {
        organizedLaunches[year] = {};
      }
      if (!organizedLaunches[year][month]) {
        organizedLaunches[year][month] = [];
      }

      organizedLaunches[year][month].push(launch);
    });

    return organizedLaunches;
  }


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await fetchLancamentos();
      setIsLoading(false);

      console.log("resultados de fetch da api", result)
      if (result && result.length > 0) {
        setOrganizedLaunches(organizeLaunches(result));
      }

    };

    fetchData();
  }, [launches]);


    fetchData();
  }, [tripId]);
  
  return (
    <>
      {isLoading ? (
        <p className="text-zinc-500 text-sm">Carregando lançamentos...</p>
      ) : error ? (
        <p className="text-zinc-500 text-sm">{error}</p>
      ) : Object.keys(organizedLaunches).length > 0 ? (
        <>
          {
            Object.keys(organizedLaunches).map(year => (
              <div key={year} className="space-y-8">
                {Object.keys(organizedLaunches[year]).map(month => (
                  <div key={month} className="space-y-2.5">
                    <div className="flex gap-2 items-baseline">
                      <span className="text-xl text-zinc-300 font-semibold">{month} </span>
                      <span className="text-xs text-zinc-500">{year}</span>
                    </div>
                    {organizedLaunches[year][month].length > 0 ? (
                      <div>
                        {organizedLaunches[year][month].map(launch => (
                          <div key={launch.id} className="space-y-2.5 mb-2">

                            <Link to={`/rocket/${launch.id}`} className="">
                              <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                
                                {launch.status === "PENDING" ? (
                                  <CircleDashed className="size-5 text-gray-400" />
                                ) : (
                                  <CircleFadingArrowUp className="size-5 text-lime-500  shrink-0" />
                                )}
                                {/* <CircleCheck className="size-5 text-lime-300" /> */}
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