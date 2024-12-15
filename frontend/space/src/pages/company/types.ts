import {
	LucideIcon,
  } from 'lucide-react';

  /**
 * Dados recebidos do WebSocket durante a missão.
 */
export interface WebSocketData {
	altitude: number;
	velocidade: number;
	velocidade_x: number;
	aceleracao: number;
	combustivel: number;
	alertas: Array<{
		parametro?: string | null
		status: boolean;
		nome_alerta?: string
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

export interface Rocket {
	name: string;
	height: number;
	diameter: number;
	weight: number;
}
export interface Launch {
	id: number;
	missionName: string;
	launchDate: string;
	rocketId: number;
	address: string;
	status: 'LAUNCHED' | 'SUCCESS' | 'FAILED' | 'PENDING';
	astronauts: number[];
};



export interface RocketInfoProps {
	rocket?: Rocket | null;
	launch?: Launch | null;
}


export interface DashboardProps {
	launchId?: string 
}

export interface CardProps {
	children: React.ReactNode;
	className?: string;
}

export interface StatusCardProps {
	icon: LucideIcon;
	iconTextColor?: string;
	iconBgColor?: string;
	title: string;
	value: string | number;
	unit: string;
	status?: string;
	className?: string;
}