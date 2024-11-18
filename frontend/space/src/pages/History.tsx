import Header from '../components/Header';
import LaunchItem from '../components/LauchItem'
import '../styles/History.css'

export default function History() {

    return (
        <div className='container'>
            <Header></Header>
            <div className="launch-history">
                <h1>Histórico de Lançamentos</h1>

                {Object.entries(launchHistory).map(([month, launches]) => (
                    <div key={month}>
                        <h2>{month}</h2>
                        {launches.map((launch, index) => (
                            <LaunchItem
                            key={index}
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
      { name: 'Antares', date: '23 de Novembro 08:00h', status: 'success' },
      { name: 'Atlas V', date: '23 de Novembro 08:00h', status: 'success' },
      { name: 'LauncherOne', date: '23 de Novembro 08:00h', status: 'success' },
    ],
    Outubro: [
      { name: 'LauncherOne', date: '23 de Outubro 08:00h', status: 'failure' },
    ],
};