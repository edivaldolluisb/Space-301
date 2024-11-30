import { CircleCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

interface Launch {
  id: number;
  name: string;
  date: string;
  status: string;
}

interface MonthLaunches {
  monthYear: string;
  launches: Launch[];
}

export function ListLaunchHistory() {
  const [groupedByMonth, setGroupedByMonth] = useState<Record<string, Launch[]>>({});

  const launchHistory: Launch[] = [
    { id: 1, name: 'Antares', date: '2024-12-15T10:00:00.000+00:00', status: 'success' },
    { id: 2, name: 'Atlas V', date: '2024-10-15T10:00:00.000+00:00', status: 'success' },
    { id: 3, name: 'LauncherOne', date: '2024-11-15T10:00:00.000+00:00', status: 'success' },
    { id: 4, name: 'LauncherOne', date: '2024-12-15T10:00:00.000+00:00', status: 'failure' }
  ];

  const organizeLaunchesByMonth = (launches: Launch[]): MonthLaunches[] => {
    const launchesByMonth: Record<string, Launch[]> = launches.reduce((acc, launch) => {
      const launchDate = new Date(launch.date);
      const monthYear = `${launchDate.getFullYear()}-${String(launchDate.getMonth() + 1).padStart(2, '0')}`;

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(launch);
      return acc;
    }, {} as Record<string, Launch[]>);

    return Object.entries(launchesByMonth).map(([monthYear, launches]) => ({
      monthYear,
      launches,
    }));
  };

  useEffect(() => {
    const organizedLaunches = organizeLaunchesByMonth(launchHistory);
    const groupedByMonthObj = organizedLaunches.reduce((acc, { monthYear, launches }) => {
      acc[monthYear] = launches;
      return acc;
    }, {} as Record<string, Launch[]>);

    setGroupedByMonth(groupedByMonthObj);
  }, [launchHistory]);

  const renderLaunchItem = (launch: Launch) => (
    <div key={launch.id} className="space-y-2.5 mb-2 mt-0">
      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
        <CircleCheck className="size-5 text-lime-300" />
        <span className="text-zinc-100">{launch.name}</span>
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-s text-zinc-500">
			{format(new Date(launch.date),  "d' de 'LLLL", { locale: pt })}
          </span>
          <span className="text-zinc-400 text-sm">
            {format(new Date(launch.date), 'HH:mm')}h
          </span>
          <span className="text-zinc-400 text-sm">
            Ver dados
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {Object.entries(groupedByMonth).map(([monthYear, launches]) => (
        <div key={monthYear} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300 font-semibold">
              {format(new Date(monthYear), 'MMMM', { locale: pt })}
            </span>
            <span className="text-zinc-500 text-sm">
              {format(new Date(monthYear), 'yyyy', { locale: pt })}
            </span>
          </div>
          {launches.map(renderLaunchItem)}
        </div>
      ))}
    </div>
  );
}