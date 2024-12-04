import { MapPin, Calendar, Settings2, Rocket } from "lucide-react";
import { Button } from "./button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { api } from "../../lib/axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";


export function DestinationAndDateHeader() {
  const { tripId } = useParams()

  useEffect(() => {
    // api.get(`trips/${tripId}`).then(response => setTrip(response.data.trip))
  }, [tripId])

  const todayDate = new Date()
  const displayedDate = format(todayDate, "d' de 'LLLL")

  const Address = "Aveiro, Portugal"

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{Address}</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-zinc-100">{displayedDate}</span>
          </div>

          <div className="w-px h-6 bg-zinc-800" />

          {/* <Button variant="secondary">
            Página inicial
            <Rocket className="size-5" />
          </Button> */}
                
      
        <Link to={"/dashboard"} className="">
          <Button variant="secondary">
            <Rocket className="size-5" />
            Página inicial
          </Button>
        </Link>
      

          <Button variant="secondary">
            Definições
            <Settings2 className="size-5" />
          </Button>
        </div>
      </div>
  )
}