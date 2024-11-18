import { useEffect, useState } from 'react';
import Header from '../components/Header';
import LaunchItem from '../components/LauchItem'
import '../styles/History.css'

export default function History() {
    const [historyLaunches, setHistoryLaunches] = useState();


    const fetchHistoryLaunches = async () => {
        try {
          const response = await fetch("/api/v1/history/launches");
          const data = await response.json();
          setHistoryLaunches(data);
        } catch (error) {
          console.error("Erro ao buscar foguetes:", error);
        }
    };

    useEffect(() => {
        fetchHistoryLaunches();
    }, [])

    return (
        <div className='container'>
            <Header></Header>
            <div className="launch-history">
                <h1>Histórico de Lançamentos</h1>

                {Object.entries(historyLaunches).map(([month, launches]) => (
                    <div key={month}>
                        <h2>{month}</h2>
                        {launches.map((launch, index) => (
                            <LaunchItem
                            id={launch.id}
                            name={launch.name}
                            date={launch.date}
                            status={launch.status}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}


const launchHistory = {
    Novembro: [
      { id:1, name: 'Antares', date: '23 de Novembro 08:00h', status: 'success' },
      { id:2, name: 'Atlas V', date: '23 de Novembro 08:00h', status: 'success' },
      { id:3, name: 'LauncherOne', date: '23 de Novembro 08:00h', status: 'success' },
    ],
    Outubro: [
      { id:4, name: 'LauncherOne', date: '23 de Outubro 08:00h', status: 'failure' },
    ],
};