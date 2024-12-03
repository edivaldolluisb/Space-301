import { Siren } from "lucide-react";
import { Button } from "../../components/button";
import { Link } from 'react-router-dom';

import { format } from "date-fns";
import { useState, useEffect } from "react";
import { apiService } from "../../lib/axios";
import { Client } from "@stomp/stompjs";
import { pt } from "date-fns/locale";


interface Activity {
	date: string;
	id: number;
	message: string;
	status: boolean;
	launch: number | null;
}

interface GroupedActivities {
	true: Activity[];
	false: Activity[];
}

export function ImportantLinks() {

	const [groupedActivities, setGroupedActivities] = useState<GroupedActivities>({
		true: [],
		false: [],
	});

	useEffect(() => {
		async function loadActivities() {
			try {
				const response = await apiService.get<Activity[]>('/alerts');

				const grouped = response.reduce<GroupedActivities>(
					(groups, activity) => {
						groups[activity.status ? 'true' : 'false'].push(activity);
						return groups;
					},
					{ true: [], false: [] }
				);

				setGroupedActivities(grouped);
			} catch (error) {
				console.error('Erro ao carregar atividades:', error);
			}
		}

		loadActivities();
	}, []);

	useEffect(() => {
		const client = new Client({
			brokerURL: "ws://localhost:8080/space-websocket",
			onConnect: () => {
				console.log("Connected to dashboard WebSocket");
				client.subscribe("/topic/alerts", (message) => {
					if (message.body) {
						const newActivities: Activity[] = JSON.parse(message.body);
						console.log("Novas atividades recebidas:", newActivities);

						const grouped = newActivities.reduce<GroupedActivities>(
							(groups, activity) => {
								groups[activity.status ? "true" : "false"].push(activity);
								return groups;
							},
							{ true: [], false: [] }
						);

						setGroupedActivities(grouped);
					}
				});


			},
		});

		client.activate();

		// Cleanup on component unmount
		return () => {
			client.deactivate();
		};
	});


	return (
		<div className="space-y-6">
			<h2 className="font-semibold text-xl">Alertas</h2>

			<div className="space-y-5">
				{groupedActivities.false.slice(0, 4).map((activity) => (
					<div key={activity.id} className="flex items-center justify-between gap-4">
						<div className="space-y-1.5">
							<span className="block font-medium text-zinc-100">{activity.message}</span>

							<span className="text-sm text-zinc-400 truncate hover:text-zinc-200">{format(activity.date, "d' de 'LLLL", { locale: pt })}</span>
						</div>

						<Siren className="text-red-400 size-5 shrink-0" />
					</div>
				))}

				{/* <div className="flex items-center justify-between gap-4">
					<div className="space-y-1.5">
						<span className="block font-medium text-zinc-100">A Velocidade está 2x acima do padrão estipuldado de X</span>

						<span className="text-sm text-zinc-400 truncate hover:text-zinc-200">23 de Setembro 08:00h</span>
					</div>

					<Siren className="text-zinc-400 size-5 shrink-0" />
				</div> */}
			</div>

			<div>
				<Link to={"/alerts"} className="">
					<Button variant="secondary" size="full">
						<Siren className="size-5" />
						Todos os alertas
					</Button>
				</Link>
			</div>
		</div>
	)
}