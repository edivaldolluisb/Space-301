import { Siren } from "lucide-react";
import { Button } from "../../components/button";
import { Link } from 'react-router-dom';

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Alertas</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">A temperatura está 20º </span>

            <span className="text-xs text-zinc-400 truncate hover:text-zinc-200">23 de Setembro 08:00h</span>
          </div>

          <Siren className="text-zinc-400 size-5 shrink-0" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">A Velocidade está 2x acima do padrão estipuldado de X</span>

            <span className="text-xs text-zinc-400 truncate hover:text-zinc-200">23 de Setembro 08:00h</span>
          </div>

          <Siren className="text-zinc-400 size-5 shrink-0" />
        </div>
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