import { Users, History } from "lucide-react";
import { DestinationAndDateHeader } from "../../components/destination-and-date-header";
import { Button } from "../../components/button";
import Dashboard from "./dashboard";
import { SpeedGraph, TemperatureGraph, AltitudeGraph, PressureGraph, OxygenGraph, ExternalTemperatureGraph } from "./graph";
import { InternalExternalGraph } from "./graphs/InternalExternalGraph"

import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import { auth } from "@/lib/axios";


export function RocketDetailsPage() {
  const navigate = useNavigate();
  const { launchId } = useParams()

  const [isHistorySectionOpen, setIsHistorySectionOpen] = useState(false)

  const { authenticated } = auth.isAuthenticated();


  const speedGraphRef = useRef<HTMLDivElement>(null);
  const temperatureGraphRef = useRef<HTMLDivElement>(null);
  const pressureGraphRef = useRef<HTMLDivElement>(null);
  const oxygenGraphRef = useRef<HTMLDivElement>(null);
  const externalTemperatureGraphRef = useRef<HTMLDivElement>(null);

  const graphRefs = [
    speedGraphRef,
    temperatureGraphRef,
    pressureGraphRef,
    oxygenGraphRef,
    externalTemperatureGraphRef
  ];


  useEffect(() => {

    if (isHistorySectionOpen) {

      const lastVisibleRef = graphRefs.reverse().find(ref => ref.current);

      if (lastVisibleRef?.current) {
        lastVisibleRef.current.focus();

        lastVisibleRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [isHistorySectionOpen]);

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
              {authenticated && (
                <Link to={`/sinais-vitais/${launchId}`}>
                  <Button variant="secondary">
                    <Users className="size-5" />
                    Ver tripulantes
                  </Button>
                </Link>
              )}
              <Button variant="secondary" onClick={() => setIsHistorySectionOpen(!isHistorySectionOpen)}
                aria-expanded={isHistorySectionOpen}
                aria-label="Ver histórico completo"
              >
                <History className="size-5" />
                {isHistorySectionOpen ? "Ocultar histórico" : "Ver histórico completo"}
              </Button>
            </div>
          </div>

          {/* <Activities /> */}
          <Dashboard launchId={launchId} />
          <AltitudeGraph launchId={launchId} />
          <InternalExternalGraph launchId={launchId} />

          {/* show the others graphs if history is clicked */}
          {isHistorySectionOpen && (
            <>
              <div ref={temperatureGraphRef} tabIndex={-1}>
                <TemperatureGraph launchId={launchId} />
              </div>
              <div ref={speedGraphRef} tabIndex={-1}>
                <SpeedGraph launchId={launchId} />
              </div>
              <div ref={pressureGraphRef} tabIndex={-1}>
                <PressureGraph launchId={launchId} />
              </div>
              <div ref={oxygenGraphRef} tabIndex={-1}>
                <OxygenGraph launchId={launchId} />
              </div>
              <div ref={externalTemperatureGraphRef} tabIndex={-1}>
                <ExternalTemperatureGraph launchId={launchId} />
              </div>
            </>
          )}

        </div>
      </main >

    </div >
  )
}