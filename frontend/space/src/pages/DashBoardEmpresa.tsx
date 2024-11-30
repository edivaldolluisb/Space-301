import './../styles/dashboard.css'

import React from 'react';
import { CircleCheck, Plus, Siren, UserCog, X } from 'lucide-react';

interface Launch {
  name: string;
  date: string;
  time: string;
  success: boolean;
}

interface LaunchList {
  month: string;
  launches: Launch[];
}

const launches: LaunchList[] = [
  {
    month: 'Novembro',
    launches: [
      { name: 'Thunderbolt', date: '10 de Novembro', time: '08:00h', success: true },
      { name: 'Antares', date: '23 de Novembro', time: '08:00h', success: true },
      { name: 'Atlas V', date: '23 de Novembro', time: '08:00h', success: true },
    ],
  },
  {
    month: 'Dezembro',
    launches: [
      { name: 'LauncherOne', date: '23 de Dezembro', time: '08:00h', success: false },
    ],
  },
];

interface Alert {
  message: string;
  date: string;
  time: string;
  status: string;
}

const alerts: Alert[] = [
  {
    message: 'A temperatura está 20° acima do normal',
    date: '23 de Setembro',
    time: '08:00h',
    status: 'bell',
  },
  {
    message: 'A Velocidade está 2x acima do esperado',
    date: '23 de Setembro',
    time: '08:00h',
    status: 'bell',
  },
];

interface History {
  name: string;
  date: string;
  status: string;
}

const history: History[] = [
  {
    name: 'Thunderbolt',
    date: '10 de Setembro',
    status: 'check',
  },
  {
    name: 'Neptune',
    date: '10 de Julho',
    status: 'x',
  },
  {
    name: 'Neptune',
    date: '12 de Junho',
    status: 'x',
  },
];

const LaunchItem: React.FC<{ launch: Launch }> = ({ launch }) => (
  <div className="launch-item">
    <h3 className="launch-name">
      <span className={`status ${launch.success ? 'check' : 'fail'}`}></span>
      {launch.name}
    </h3>
    <p className="launch-date">
      {launch.date} - {launch.time}
    </p>
  </div>
);

const AlertItem: React.FC<Alert> = ({ message, date, time, status }) => {
  return (
    <div className="alert-item">
      <div>
        <p className='alert-message'>{message}</p>
        <p className='alert-date'>{date} - {time}</p>
      </div>
      <span className={`status ${status}`}><Siren color='#BEF264'/></span>
    </div>
  );
};

const HistoryItem: React.FC<History> = ({ name, date, status }) => {
  return (
    <div className="history-item">
      <div>
        <h3 className="history-name">{name}</h3>
        <p className="history-date">{date}</p>
      </div>
      <span className={`status ${status}`}>{status === 'x' ? <X color='red'  /> : <CircleCheck color='#BEF264' />}</span>
    </div>
  );
};

const DashBoardEmpresa: React.FC = () => {
  return (
    <div className='app'>
      <header>
        <p>Aveiro,Portugal</p>
        <p>{DataAtual()}</p>
        <button onClick={() =>alert('Hello Rafa')}>Definições</button>
      </header>
      <div className="content">
        <div className="lancamentos">
          <div className="launch-header">
            <h1>Lançamentos</h1>
            <button><Plus />Cadastrar Lançamentos</button>
          </div>
          {launches.map((item, index) => (
            <div key={index} className="launch-month">
              <h2>{item.month}</h2>
              {item.launches.map((launch, i) => (
                <LaunchItem key={`${index}-${i}`} launch={launch} />
              ))}
            </div>
          ))}
      </div>

        <div className="side-tab">
          <h1>Alertas</h1>
          {alerts.map((item, index) => (
            <AlertItem key={index} {...item} />
          ))}
          <button className="alert-button"><Siren size={15} />Todos os Alertas</button>
          
          <h1>Histórico de lançamentos</h1>
          {history.map((item, index) => (
            <HistoryItem key={index} {...item} />
          ))}
          <button className="history-button"><UserCog size={15} />Ver histórico completo</button>
        </div>
      </div>
    </div>
  );
};

export default DashBoardEmpresa;

function DataAtual(){
  const datadehoje = new Date();
  const mes = datadehoje.getMonth();
  const dia = datadehoje.getDate();
  const Mes_trad_mes: Record<number, string> = {
      1: "Janeiro",
      2: "Fevereiro",
      3: "Março",
      4: "Abril",
      5: "Maio",
      6: "Junho",
      7: "Julho",
      8: "Agosto",
      9: "Setembro",
      10: "Outubro",
      11: "Novembro",
      12: "Dezembro",
  };
  return `${dia} de ${Mes_trad_mes[mes+1]}`;
}