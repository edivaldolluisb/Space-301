import { Plus, Siren } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "../../components/destination-and-date-header";
import { Button } from "../../components/button";
import  Dashboard  from "./dashboard";
import { SpeedGraph, TemperatureGraph } from "./graph";

export function RocketDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Informações gerais</h2>
          </div>

          {/* <Activities /> */}
          <Dashboard />
          <SpeedGraph/>
          <TemperatureGraph/>
        </div>

        <div className="w-80 space-y-6">
          {/* <ImportantLinks /> */}
          
        <Button variant="secondary" size="full">
            <Siren className="size-5" />
            Dados gerais
        </Button>
        <Button variant="secondary" size="full">
            <Siren className="size-5" />
            Ver tripulantes
        </Button>

          <div className="w-full h-px bg-zinc-800" />

          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal 
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  )
}