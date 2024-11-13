import { X, AtSign, KeyRound } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";

interface LoginTripModalProps {
  closeConfirmTripModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
  setCompanyEmail: (email: string) => void;
  setCompanyPassword: (password: string) => void;
}

export function LoginModal({
  closeConfirmTripModal,
  createTrip,
  setCompanyEmail,
  setCompanyPassword,
}: LoginTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Entrar</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={closeConfirmTripModal} />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
          Bem vindo de volta, tudo está no seu devido lugar
          </p>
        </div>
        
        <form onSubmit={createTrip} className="space-y-3">

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <AtSign className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="E-mail de login"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={event => setCompanyEmail(event.target.value)}
            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <KeyRound className="text-zinc-400 size-5" />
            <input
              type="password"
              name="password"
              placeholder="Password de login"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={event => setCompanyPassword(event.target.value)}
            />
          </div>

          <Button type="submit" size="full">
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}