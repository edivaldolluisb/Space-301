import React from 'react';
import { Flame, Thermometer, Wind, Leaf, LucideIcon, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';


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

// Componente Card base
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-zinc-900 rounded-lg p-4 ${className}`}>
    {children}
  </div>
);

// Componente de Informação do Foguete
const RocketInfo: React.FC = () => (
  <Card className="relative row-span-2">
    <div className="h-32 overflow-hidden rounded-lg mb-4">
      <img
        src="/rockets/spacex--p-KCm6xB9I-unsplash.jpg"
        alt="Falcon Heavy"
        className="w-full h-full object-cover"
      />
    </div>
    <h2 className="text-xl font-bold text-white mb-2">Falcon Heavy</h2>
    <div className="space-y-1 text-gray-400">
      <p>Comprimento: 70 m</p>
      <p>Diâmetro: 3.66 m</p>
      <p>Massa: 1.420.788 kg</p>
    </div>

    <div className="flex justify-between mt-3 items-center">
      <div className='flex'>
        <MapPin className="w-5 h-5 text-gray-400" />
        <span>Aveiro, Portugal</span>
      </div>
      <span className="px-2 py-1 bg-red-500/20 text-red-500 rounded text-sm">
        Failed
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
  <Card className={className }>
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg ${iconBgColor}`}>
        <Icon className={`w-6 h-6 ${iconTextColor}`} />
      </div>
      <span className="text-gray-400">{title}</span>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-4xl font-bold text-white">{value}</span>
      <span className="text-gray-400">{unit}</span>
    </div>
    {status && (
    <span className="inline-block mt-2 px-2 py-1 bg-green-500/20 text-green-500 rounded text-sm">
      {status}
    </span>
    )}
  </Card>
);



const Dashboard: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <RocketInfo />
    <StatusCard
      icon={Flame}
      title="Taxa de combustão"
      value="5"
      unit="l/s"
      status="Normal"
      iconTextColor="text-red-500"
      iconBgColor="bg-red-500/20"
      // className="max-h-44"
      // className="bg-red-500/10 border border-red-500 max-h-44"
    />
    <StatusCard
      icon={Thermometer}
      title="Temperatura dos motores"
      value="30"
      unit="°C"
      status="Normal"
      iconTextColor="text-blue-500"
      iconBgColor="bg-blue-500/20"
      // className='row-span-2'
    />
    <StatusCard
      icon={Leaf}
      title="Oxigênio da Tripulação"
      value="86"
      unit="%"
      // status="Normal"
      iconTextColor="text-green-500"
      iconBgColor="bg-green-500/20"
    />
    <StatusCard
      icon={Leaf}
      title="Oxigênio da Combustão"
      value="56"
      unit="%"
      // status="Normal"
      iconTextColor="text-yellow-500"
      iconBgColor="bg-yellow-500/20"
    />
  </div>
);

export default Dashboard;
