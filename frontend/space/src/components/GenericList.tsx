import { CircleCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { apiService } from "../lib/axios";

interface GenericItem {
  id: number;
  date: string;
  message?: string;
  name?: string;
  status?: boolean | string;
}

interface Activity {
    date: string;
    id: number;
    message: string;
    status: boolean;
    launch: number | null;
  }

interface GroupedListProps<T extends GenericItem> {
  fetchItems: () => Promise<T[]>;
  groupKey: 'status' | 'month';
  seenLabel?: string;
  unseenLabel?: string;
  renderExtraDetails?: (item: T) => React.ReactNode;
}

export function GenericList<T extends GenericItem>({
  fetchItems,
  groupKey,
  seenLabel = 'Vistos',
  unseenLabel = 'Não vistos',
  renderExtraDetails
}: GroupedListProps<T>) {
  const [groupedItems, setGroupedItems] = useState<Record<string, T[]>>({});

  useEffect(() => {
    async function loadItems() {
      try {
        const items = await fetchItems();
        
        const grouped = items.reduce<Record<string, T[]>>((groups, item) => {
          let key: string;
          
          if (groupKey === 'status') {
            key = item.status ? 'true' : 'false';
          } else {
            const itemDate = new Date(item.date);
            key = `${itemDate.getFullYear()}-${itemDate.getMonth() + 1}`;
          }

          if (!groups[key]) {
            groups[key] = [];
          }
          groups[key].push(item);
          
          return groups;
        }, {});
        
        setGroupedItems(grouped);
      } catch (error) {
        console.error('Erro ao carregar itens:', error);
      }
    }

    loadItems();
  }, [fetchItems, groupKey]);

  const renderGroupSection = (sectionKey: string, items: T[], label: string) => (
    <div className="space-y-2.5" key={sectionKey}>
      <div className="flex gap-2 items-baseline">
        <span className={`text-xl font-semibold ${sectionKey === 'true' || items.length > 0 ? 'text-zinc-300' : 'text-zinc-500'}`}>
          {label}
        </span>
      </div>
      {items.length > 0 ? (
        <div>
          {items.map(item => (
            <div key={item.id} className="space-y-2.5 mb-2">
              <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                <CircleCheck className={`size-5 ${sectionKey === 'true' ? 'text-lime-300' : 'text-zinc-500'}`} />
                <span className="text-zinc-100">{item.message || item.name}</span>
                <div className="flex items-center gap-3 ml-auto">
                  <span className="text-s text-zinc-500">
                    {format(new Date(item.date), 'dd/MM/yyyy')}
                  </span>
                  <span className="text-zinc-400 text-sm">
                    {format(new Date(item.date), 'HH:mm')}h
                  </span>
                  {renderExtraDetails && renderExtraDetails(item)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-zinc-500 text-sm">Nenhum item a ser apresentado.</p>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {groupKey === 'status' ? (
        <>
          {renderGroupSection('false', groupedItems['false'] || [], unseenLabel)}
          {renderGroupSection('true', groupedItems['true'] || [], seenLabel)}
        </>
      ) : (
        Object.entries(groupedItems)
          .sort(([a], [b]) => {
            const [yearA, monthA] = a.split('-').map(Number);
            const [yearB, monthB] = b.split('-').map(Number);
            return yearA !== yearB ? yearA - yearB : monthA - monthB;
          })
          .map(([monthYear, launches]) => (
            <div key={monthYear} className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">
                  {format(new Date(monthYear), 'MMMM', { locale: ptBR })}
                </span>
                <span className="text-zinc-500 text-sm">
                  {format(new Date(monthYear), 'yyyy', { locale: ptBR })}
                </span>
              </div>
              {renderGroupSection(monthYear, launches, '')}
            </div>
          ))
      )}
    </div>
  );
}

// // Example Usage for Activities
// export function Activities() {
//   const fetchActivities = async () => {
//     const response = await apiService.get<Activity[]>('/alerts');
//     return response;
//   };

//   return (
//     <GenericList 
//       fetchItems={fetchActivities} 
//       groupKey="status" 
//       renderExtraDetails={(activity) => (
//         <span className="text-zinc-400 text-sm">
//           Ver foguete
//         </span>
//       )}
//     />
//   );
// }

// // Example Usage for Launch History
// export function ListLaunchHistory() {
//   const fetchLaunchHistory = async () => {
//     // In a real app, this would be an API call
//     return [
//       { id: 1, name: 'Antares', date: '2024-12-15T10:00:00.000+00:00', status: 'success' },
//       { id: 2, name: 'Atlas V', date: '2024-10-15T10:00:00.000+00:00', status: 'success' },
//       // ... other launches
//     ];
//   };

//   return (
//     <GenericList 
//       fetchItems={fetchLaunchHistory} 
//       groupKey="month" 
//       renderExtraDetails={(launch) => (
//         <span className="text-zinc-400 text-sm">
//           Ver dados
//         </span>
//       )}
//     />
//   );
// }