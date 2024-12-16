import { CircleCheckBig, Plus } from "lucide-react";
import { ListAlerts } from "./list-alerts";
import { DestinationAndDateHeader } from "../../components/destination-and-date-header";
import { apiService } from "../../lib/axios";

import { useToast } from "@/components/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"


export function AlertsPage() {
	
	const { toast } = useToast()

	function markAllAsSeen() {
		updateAlerts();
	}
	async function updateAlerts() {
		try {
			const response = await apiService.patch<{ updated: number }>('/alerts');
			console.log("updated:", response)
			
			toast({
				title: "Alertas atualizados.",
				description: `Foram atualizados ${response.updated} alerta(s).`,
				action:<CircleCheckBig className="size-5 text-lime-300" />,
				
			  });
		} catch (error) {
			console.error('Erro ao carregar atualizar alertas:', error);
			toast({
				title: "Erro ao atualizar alertas.",
				description: "Não foi possivel atualizar os alertas.",
			  });
		}
	}


	return (
		<div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
			<DestinationAndDateHeader />

			<main className="flex gap-16 px-4">
				<div className="flex-1 space-y-6">
					<div className="flex items-center justify-between">
						<h2 className="text-3xl font-semibold">Alertas</h2>

						<button onClick={markAllAsSeen} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
							<Plus className="size-5" />
							Marcar todos como visto
						</button>
					</div>

					<ListAlerts />
				</div>

			</main>
			<Toaster />
		</div>
	)
}