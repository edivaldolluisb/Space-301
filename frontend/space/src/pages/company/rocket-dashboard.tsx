import { Users, History } from "lucide-react";
import { DestinationAndDateHeader } from "../../components/destination-and-date-header";
import { Button } from "../../components/button";
import Dashboard from "./dashboard";
import { SpeedGraph, TemperatureGraph, AltitudeGraph, PressureGraph, OxygenGraph, ExternalTemperatureGraph } from "./graph";

import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import { useState } from "react";


export function RocketDetailsPage() {
  const navigate = useNavigate();
  const { launchId } = useParams()

  const [isHistorySectionOpen, setIsHistorySectionOpen] = useState(false)

  if (!launchId) {
    navigate('/dashboard')
    return null
  }


  console.log("getting param: ", launchId)


  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Informações gerais</h2>


            <div className="flex items-center gap-5">
              <Link to={`/sinais-vitais/${launchId}`}>
                <Button variant="secondary">
                  <Users className="size-5" />
                  Ver tripulantes
                </Button>
              </Link>
              <Button variant="secondary" onClick={() => setIsHistorySectionOpen(!isHistorySectionOpen)}>
                <History className="size-5" />
                Ver histórico completo
              </Button>
            </div>
          </div>

          {/* <Activities /> */}
          <Dashboard launchId={launchId} />
          <AltitudeGraph launchId={launchId} />

          {/* show the others graphs if history is clicked */}
          {isHistorySectionOpen && (
            <>
              <TemperatureGraph launchId={launchId} />
              <SpeedGraph launchId={launchId} />
              <PressureGraph launchId={launchId} />
              <OxygenGraph launchId={launchId} />
              <ExternalTemperatureGraph launchId={launchId} />
            </>
          )}

        </div>
      </main >

    </div >
  )
}