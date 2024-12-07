import { CircleCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { apiService } from "../../lib/axios";

import { Client } from "@stomp/stompjs";

import { Link } from "react-router-dom";

// {
// 	"id": 1,
// 	"message": "Qualidade do sinal baixa!",
// 	"date": "2024-12-07T15:15:36.300+00:00",
// 	"status": true,
// 	"launch": {
// 		"id": 1,
// 		"missionName": "Missão de teste",
// 		"launchDate": "2024-12-07T15:14:00.000+00:00",
// 		"rocketId": 2,
// 		"address": "Universidade de Aveiro",
// 		"status": "PENDING",
// 		"astronauts": [
// 			1,
// 			2,
// 			3,
// 			4
// 		]
// 	}
// }
interface Activity {
	date: string;
	id: number;
	message: string;
	status: boolean;
	launch: Launch | null;
}

interface Launch {
	id: number;
	missionName: string;
	launchDate: string;
	rocketId: number | string | null;
	address: string;
	status: string;
	astronauts: number[];
}

interface GroupedActivities {
	true: Activity[];
	false: Activity[];
}

export function Activities() {
	// const [activities, setActivities] = useState<Activity[]>([]);
	const [groupedActivities, setGroupedActivities] = useState<GroupedActivities>({
		true: [],
		false: [],
	});

	const todayDate = new Date();
	const displayedDate = format(todayDate, "d' de 'LLLL");

	useEffect(() => {
		async function loadActivities() {
			try {
				const response = await apiService.get<Activity[]>('/alerts');
				// console.log(response)
				// setActivities(response);

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

	// websocket fetch
	useEffect(() => {
		const client = new Client({
			brokerURL: "ws://localhost:8080/space-websocket",
			onConnect: () => {
				console.log("Connected to WebSocket");
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
		<div className="space-y-8">
			<div className="space-y-2.5">
				<div className="flex gap-2 items-baseline">
					<span className="text-xl text-zinc-300 font-semibold">Não vistos</span>
				</div>
				{groupedActivities.false.length > 0 ? (
					<div>
						{groupedActivities.false.map(activity => {
							return (
								<div key={activity.id} className="space-y-2.5 mb-2">
									<div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
										<CircleCheck className="size-5 text-lime-300" />
										<span className="text-zinc-100">{activity.message}</span>
										<div className="flex items-center gap-3 ml-auto">
											<span className="text-s text-zinc-500">{displayedDate} </span>
											<span className="text-zinc-400 text-sm">
												{format(new Date(activity.date), 'HH:mm')}h
											</span>
											<span className="text-zinc-400 text-sm">
												<Link to={`/rocket/${activity?.launch?.id}`} className="">
													Ver foguete
												</Link>
											</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<p className="text-zinc-500 text-sm">Nenhum alerta a ser apresentado.</p>
				)}
			</div>

			<div className="space-y-2.5">
				<div className="flex gap-2 items-baseline">
					<span className="text-xl text-zinc-500 font-semibold">Vistos</span>
				</div>
				{groupedActivities.true.length > 0 ? (
					<div>
						{groupedActivities.true.map(activity => {
							return (
								<div key={activity.id} className="space-y-2.5 mb-2">
									<div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
										<CircleCheck className="size-5 text-zinc-500" />
										<span className="text-zinc-100">{activity.message}</span>
										<span className="text-xs text-zinc-500">
											{format(new Date(activity.date), 'EEEE', { locale: pt })}
										</span>
										<span className="text-zinc-400 text-sm ml-auto">
											{format(new Date(activity.date), 'HH:mm')}h
										</span>
										<span className="text-zinc-400 text-sm">
											<Link to={`/rocket/${activity.launch?.id}`} className="">
												Ver foguete
											</Link>
										</span>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<p className="text-zinc-500 text-sm">Nenhum alerta a ser apresentado.</p>
				)}
			</div>
		</div>
	);
}