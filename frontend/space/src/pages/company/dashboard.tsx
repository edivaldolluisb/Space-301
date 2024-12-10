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
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { DestinationAndDateHeader } from './destination-and-date-header';
import { Client } from '@stomp/stompjs';
import { useNavigate } from 'react-router-dom';
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
}




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

const statusMappings: { [key: string]: string } = {
  altitude: 'Normal',
  velocidade: 'Normal',
  velocidade_x: 'Normal',
  aceleracao: 'Normal',
  forca_g: 'Normal',
  pressao_atual: 'Normal',
  temperatura_atual: 'Normal',
  temperatura_motor_atual: 'Normal',
  temperatura_externa_atual: 'Normal',
  combustivel: 'Normal',
  qualidade_atual: 'Normal',
  oxigenio_atual: 'Normal',
  energia_atual: 'Normal',
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

// Componente Card base
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-zinc-900 rounded-lg p-4 ${className}`}>
    {children}
  </div>
);

// Componente de Informação do Foguete
const RocketInfo: React.FC<RocketInfoProps> = ({ rocket }) => (
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
      <span className="px-2 py-1 bg-green-500/20 text-white-500 rounded text-sm">
        In progress
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
    {status && (
      <span className="inline-block mt-2 px-2 py-1 bg-green-500/20 text-green-500 rounded text-sm">
        {status}
      </span>
    )}
  </Card>
);



const Dashboard: React.FC<DashboardProps> = ({ launchId }) => {
  const [rocketData, setRocketData] = useState(null as WebSocketData | null);
  const [rocket, setRocket] = useState(null as Rocket | null);
  const [error, setError] = useState<string | null>(null);

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
      <RocketInfo rocket={rocket} />
    </div>);

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RocketInfo rocket={rocket} />
        {Object.entries(rocketData).map(([key, value]) => {
          if (key === 'alertas' || key === 'alerta') return null;
          const title = titleMappings[key] || camelCaseToTitleCase(key);


          const unit = unitMappings[key] || '';
          const status = statusMappings[key] || 'Normal';
          const Icon = iconMappings[key] || Flame;
          const iconTextColor = 'text-blue-500';
          const iconBgColor = 'bg-blue-500/20';

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
