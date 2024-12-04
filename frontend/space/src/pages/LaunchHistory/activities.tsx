import { CircleCheck } from "lucide-react";
import { api } from "../../lib/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[]
}

export function Activities() {
  const { tripId } = useParams()
  const [activities, setActivities] = useState<Activity[]>([])

  const transformData = (missions: any[]): Activity[] => {
    // Agrupar missões por data
    const grouped = missions.reduce((acc: Record<string, { id: string; title: string; occurs_at: string }[]>, mission) => {
      const date = mission.lauchDate.split("T")[0]; // Extrai apenas a data
      if (!acc[date]) acc[date] = [];
      acc[date].push({
        id: mission.id.toString(),
        title: mission.missionName,
        occurs_at: mission.lauchDate,
      });
      return acc;
    }, {});
  
    // Converter para o formato desejado
    return Object.entries(grouped).map(([date, activities]) => ({
      date,
      activities,
    }));
  };

  const fetchLancamentos = async () => {
    try {
      const response = await api.get('/history/launches');
      const data = await response.data
      const launches = data
                        .filter((item: { launch: null; }) => item.launch !== null)
                        .map((item: { launch: any; }) => item.launch);
      return launches
      
    } catch (error) {
      console.log("Erro ao buscar lançamentos:", error)
      return null
    }
    
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchLancamentos();
      if (result) {
        setActivities(transformData(result));
      }
    };

    fetchData();
  }, [tripId]);
  
  return (
    <div className="space-y-8">
      {activities.map(category => {
        return (
          <div key={category.date} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-zinc-300 font-semibold">{format(category.date, 'LLLL')}</span>
              <span className="text-xs text-zinc-500">{format(category.date, 'y', { locale: pt })}</span>
            </div>
            {category.activities.length > 0 ? (
              <div>
                {category.activities.map(activity => {
                  return (
                    <div key={activity.id} className="space-y-2.5 mb-2">
                      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">{activity.title}</span>
                        <span className="text-zinc-400 text-sm ml-auto">
                        {format(activity.occurs_at, "d' de 'LLLL  'às' HH'h'mm", { locale: pt })}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">Nenhum lançamento cadastrado para essa data.</p>
            )}
          </div>
        )
      })}
    </div>
  )
}