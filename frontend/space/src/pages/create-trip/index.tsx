import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";
import { Button } from "../../components/button";

export function CreateTripPage() {

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/icons8-rocket-emoji-32.png" alt="Space301" />
          <p className="text-zinc-300 text-lg">
          Manage lunches 
          and your rockets as you always wanted!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button >Entrar</Button>
          <Button variant="secondary">Registar</Button>
          <div className="col-span-2">
            <Button size="full">Visitante</Button>
          </div>
        </div>

        <p className="text-sm text-zinc-500">
          Acedendo aos nossos serviços você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>
      </div>


    </div>
  );
}
