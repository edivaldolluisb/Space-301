import React, { useEffect, useState } from 'react';
import {
  ExternalLink,
  Flame,
  Thermometer,
  Wind,
  Leaf,
  MapPin,
  Gauge,
  Fuel,
  Signal,
  BatteryCharging,
  LucideIcon,
} from 'lucide-react';
import { Client } from '@stomp/stompjs';
import { api } from "../../lib/axios";


interface DashboardProps {
  launchId: string | undefined;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface StatusCardProps {
  icon: LucideIcon;
  iconTextColor?: string;
  iconBgColor?: string;
  title: string;
  value: string | number;
  unit: string;
  status?: string;
  className?: string;
}


const titleMappings: { [key: string]: string } = {
  altitude: "Altitude do foguete",
  velocidade: "Velocidade do foguete",
  velocidade_x: "Velocidade Horizontal",
  aceleracao: "Aceleração do foguete",
  forca_g: "Força gravitacional experimentada",
  pressao_atual: "Pressão Interna",
  temperatura_atual: "Temperatura interna do foguete",
  temperatura_motor_atual: "Temperatura do motor do foguete",
  temperatura_externa_atual: "Temperatura externa do foguete",
  combustivel: "Nível de Combustível",
  qualidade_atual: "Qualidade do Sinal",
  oxigenio_atual: "Nível de Oxigênio",
  energia_atual: "Energia produzida",
};

const camelCaseToTitleCase = (str: string) =>
  str.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());


interface WebSocketData {
  altitude: number;
  velocidade: number;
  velocidade_x: number;
  aceleracao: number;
  combustivel: number;
  alertas: Array<{
    parametro: string | null;
    status: boolean;
    nome_alerta: string | null;
    alerta_nome: string;
    alerta_descricao: string;
  }>;
  forca_g: number;
  pressao_atual: number;
  temperatura_atual: number;
  temperatura_motor_atual: number;
  temperatura_externa_atual: number;
  qualidade_atual: number;
  oxigenio_atual: number;
  energia_atual: number;
}

interface Rocket {
  name: string;
  height: number;
  diameter: number;
  weight: number;
}
interface RocketInfoProps {
  rocket: Rocket;
  launch: Launch;
}

interface Launch {
  id: number;
  missionName: string;
  launchDate: string;
  rocketId: number;
  address: string;
  status: 'LAUNCHED' | 'SUCCESS' | 'FAILED' | 'PENDING';
  astronauts: number[];
};


const unitMappings: { [key: string]: string } = {
  altitude: 'm',
  velocidade: 'm/s',
  velocidade_x: 'm/s',
  aceleracao: 'm/s²',
  forca_g: 'g',
  pressao_atual: 'Pa',
  temperatura_atual: 'K',
  temperatura_motor_atual: 'K',
  temperatura_externa_atual: 'K',
  combustivel: 'kg',
  qualidade_atual: '%',
  oxigenio_atual: '%',
  energia_atual: 'J',
};

const statusMappings = (parameter: string, value: number): string => {
  const ranges: { [key: string]: { min: number; max: number } } = {
    altitude: { min: 0, max: 100000 },
    velocidade: { min: -666.67, max: 666.67 },
    velocidade_x: { min: 0, max: 300 },
    aceleracao: { min: -2.22, max: 2.22 },
    forca_g: { min: -0.226, max: 0.226 },
    pressao_atual: { min: 500, max: 101325 },
    temperatura_atual: { min: 200, max: 288.15 },
    temperatura_motor_atual: { min: 303.15, max: 600 },
    temperatura_externa_atual: { min: 3, max: 288.15 },
    combustivel: { min: 0, max: 2000000 },
    qualidade_atual: { min: 80, max: 100 },
    oxigenio_atual: { min: 18, max: 21 },
    energia_atual: { min: 100, max: 50000 },
  };

  const range = ranges[parameter];

  if (!range) {
    return 'Irregular';
  }

  return value >= range.min && value <= range.max ? 'Normal' : 'Irregular';
};

const iconMappings: { [key: string]: LucideIcon } = {
  altitude: MapPin,
  velocidade: Gauge,
  velocidade_x: Gauge,
  aceleracao: Flame,
  forca_g: Leaf,
  pressao_atual: Thermometer,
  temperatura_atual: Thermometer,
  temperatura_motor_atual: Thermometer,
  temperatura_externa_atual: Wind,
  combustivel: Fuel,
  qualidade_atual: Signal,
  oxigenio_atual: Leaf,
  energia_atual: BatteryCharging,
};


const customIconBgColors: { [key: string]: string } = {
  altitude: 'bg-blue-500/20',
  velocidade: 'bg-blue-500/20',
  velocidade_x: 'bg-blue-500/20',
  aceleracao: 'bg-red-500/20',
  forca_g: 'bg-green-500/20',
  pressao_atual: 'bg-yellow-500/20',
  temperatura_atual: 'bg-yellow-500/20',
  temperatura_motor_atual: 'bg-yellow-500/20',
  temperatura_externa_atual: 'bg-yellow-500/20',
  combustivel: 'bg-red-500/20',
  qualidade_atual: 'bg-green-500/20',
  oxigenio_atual: 'bg-green-500/20',
  energia_atual: 'bg-yellow-500/20',
};

const customIconTextColors: { [key: string]: string } = {
  altitude: 'text-blue-500',
  velocidade: 'text-blue-500',
  velocidade_x: 'text-blue-500',
  aceleracao: 'text-red-500',
  forca_g: 'text-green-500',
  pressao_atual: 'text-yellow-500',
  temperatura_atual: 'text-yellow-500',
  temperatura_motor_atual: 'text-yellow-500',
  temperatura_externa_atual: 'text-yellow-500',
  combustivel: 'text-red-500',
  qualidade_atual: 'text-green-500',
  oxigenio_atual: 'text-green-500',
  energia_atual: 'text-yellow-500',
};

  // Define a cor do estado baseado no status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LAUNCHED':
        return 'bg-green-500/20 text-green-500';
      case 'SUCCESS':
        return 'bg-green-500/20 text-green-500';
      case 'FAILED':
        return 'bg-red-500/20 text-red-500';
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  }

// Componente Card base
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-zinc-900 rounded-lg p-4 ${className}`}>
    {children}
  </div>
);

// Componente de Informação do Foguete
const RocketInfo: React.FC<RocketInfoProps> = ({ rocket, launch }) => (
  <Card className="relative row-span-2">
    <div className="h-32 overflow-hidden rounded-lg mb-4">
      <img
        src="/rockets/spacex--p-KCm6xB9I-unsplash.jpg"
        alt="Falcon Heavy"
        className="w-full h-full object-cover"
      />
    </div>
    <h2 className="text-xl font-bold text-white mb-2">{rocket.name}</h2>
    <div className="space-y-1 text-gray-400">
      <p>Comprimento: {rocket.height} m</p>
      <p>Diâmetro: {rocket.diameter} m</p>
      <p>Massa: {rocket.weight} kg</p>
    </div>

    <div className="flex justify-between mt-3 items-center">
      <div className='flex'>
        <MapPin className="w-5 h-5 text-gray-400" />
        <span>Aveiro, Portugal</span>
      </div>
      <span className={`px-2 py-1 bg-green-500/20 text-white-500 rounded text-sm ${getStatusColor(
            launch.status
          )}`}>
      {launch.status.toLowerCase()}
      </span>
    </div>
  </Card>
);


// Componente Status Card
const StatusCard: React.FC<StatusCardProps> = ({
  icon: Icon,
  iconTextColor = 'text-gray-400',
  iconBgColor = 'bg-gray-800',
  title,
  value,
  unit,
  status,
  className = "",
}) => (
  <Card className={className}>
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg ${iconBgColor}`}>
        <Icon className={`w-6 h-6 ${iconTextColor}`} />
      </div>
      <span className="text-gray-400">{title}</span>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-4xl font-bold text-white">{Number(value).toFixed(2)}</span>
      <span className="text-gray-400">{unit}</span>
    </div>

    {status && status === 'Normal' ? (
      <span className="inline-block mt-2 px-2 py-1 bg-green-500/20 text-green-500 rounded text-sm">
        {status}
      </span>
    ) : (
      <span className="inline-block mt-2 px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded text-sm">
        {status}
      </span>
    )}
  </Card>
);



const Dashboard: React.FC<DashboardProps> = ({ launchId }) => {
  const [rocketData, setRocketData] = useState(null as WebSocketData | null);
  const [rocket, setRocket] = useState(null as Rocket | null);
  const [error, setError] = useState<string | null>(null);
  const [launch, setLaunch] = useState<Launch | null>(null);

  useEffect(() => {
    // Função de fetch dos dados do lançamento
    const fetchLaunch = async () => {
      try {
        const response = await api.get(`/launches/${launchId}`);
        const data: Launch = await response.data;
        console.log('Launch:', data)
        setLaunch(data);
      } catch (error) {
        console.error('Erro ao buscar dados do lançamento:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchLaunch();
  }, [launchId]);

  const fetchRocket = async () => {
    try {
      const response = await api.get(`/launches/${launchId}/rocket`);
      console.log('Rocket :', response.data);
      return response.data
    } catch (error) {
      console.log("Erro ao buscar foguetes:", error)
      return null
    }
  }

  useEffect(() => {
    const setRocketData = async () => {
      const res = await fetchRocket();
      console.log(`Rockets: ${res}`)
      console.log(`Rockets: `, res)
      setRocket(res);
    }
    setRocketData();
  }, []);

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/space-websocket', // URL do WebSocket
      reconnectDelay: 5000, // Tenta reconectar após falhas
      onConnect: () => {
        console.log(`Conectado ao WebSocket: /topic/${launchId}/launch-data`);
        client.subscribe(`/topic/${launchId}/launch-data`, (msg) => {

          try {
            const data: WebSocketData = JSON.parse(msg.body); // Parse do payload
            console.log('Dados processados:', data);
            if (data)
              setRocketData(data);
          } catch (error) {
            console.error('Erro ao processar a mensagem do WebSocket:', error);
          }
        });
      },
      onDisconnect: () => {
        console.log('Desconectado do WebSocket');
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [launchId]);

  if (!rocketData) return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      {!rocket ? <h1 className="text-zinc-500 text-sm">Nenhum lançamento cadastrado para essa data.</h1> : <RocketInfo rocket={rocket} launch={launch} />}
    </div>);

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!rocket ? <h1 className="text-zinc-500 text-sm">Nenhum lançamento cadastrado para essa data.</h1> : <RocketInfo rocket={rocket} launch={launch} />}
        {Object.entries(rocketData).map(([key, value]) => {
          if (key === 'alertas' || key === 'alerta') return null;
          const title = titleMappings[key] || camelCaseToTitleCase(key);


          const unit = unitMappings[key] || '';
          const status = statusMappings(key, value as number);
          const Icon = iconMappings[key] || Flame;
          const iconTextColor = customIconTextColors[key] || 'text-red-500';
          const iconBgColor = customIconBgColors[key] || 'bg-red-500/20';

          return (
            <StatusCard
              key={key}
              icon={Icon}
              title={title}
              value={value as number}
              unit={unit}
              status={status}
              iconTextColor={iconTextColor}
              iconBgColor={iconBgColor}
            />
          );
        })}
      </div>
    </div>
  )
};

export default Dashboard;
