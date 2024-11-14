import { CircleCheck } from "lucide-react";
// import { api } from "../../lib/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { api } from "../../lib/axios";

// import { format } from "date-fns";

interface Activity {
  date: string;
  id: number;
  message: string;
  status: boolean;
  launch: number | null;

}

export function Activities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [groupedActivities, setGroupedActivities] = useState<{ true: Activity[]; false: Activity[] }>({
    true: [],
    false: [],
  });

  const todayDate = new Date()
  const displayedDate = format(todayDate, "d' de 'LLLL")

  useEffect(() => {
    api.get(`/alerts`).then(response => {
      setActivities(response.data);
      const grouped = response.data.reduce((groups, activity) => {
        groups[activity.status].push(activity);
        return groups;
      }, { true: [], false: [] });
      setGroupedActivities(grouped);
    })
    // api.get(`/alerts`).then(response => setActivities(response.data))
    console.log("activities: ", activities, groupedActivities)
  }, [])



  return (
    <div className="space-y-8">

      <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-zinc-300 font-semibold">Não vistos</span>
          {/* <span className="text-xs text-zinc-500">{format(category.date, 'EEEE', { locale: ptBR })}</span> */}
        </div>
        {groupedActivities.false.length > 0 ? (
          <div>
            {groupedActivities.false.map(activity => {
              return (
                <div key={activity.id} className="space-y-2.5 mb-2">
                  <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                    <CircleCheck className="size-5 text-lime-300" />
                    <span className="text-zinc-100">{activity.message}</span>
                    <div className="flex items-center gap-3 ml-auto">
                      <span className="text-s text-zinc-500">{displayedDate} </span>
                      <span className="text-zinc-400 text-sm">
                        {format(activity.date, 'HH:mm')}h
                      </span>
                      <span className="text-zinc-400 text-sm">
                        Ver foguete
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-zinc-500 text-sm">Nenhum alerta a ser apresentado.</p>
        )}
      </div>

      <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-zinc-500 font-semibold">Vistos</span>
          {/* <span className="text-xs text-zinc-500">{format(category.date, 'EEEE', { locale: ptBR })}</span> */}
        </div>
        {groupedActivities.true.length > 0 ? (
          <div>
            {groupedActivities.true.map(activity => {
              return (
                <div key={activity.id} className="space-y-2.5">
                  <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                    <CircleCheck className="size-5 text-zinc-500" />
                    <span className="text-zinc-100">{activity.message}</span>
                    <span className="text-xs text-zinc-500">{format(activity.date, 'EEEE', { locale: ptBR })}</span>
                    <span className="text-zinc-400 text-sm ml-auto">
                      {format(activity.date, 'HH:mm')}h
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-zinc-500 text-sm">Nenhuma alerta a ser apresentado.</p>
        )}
      </div>

    </div>
  )
}