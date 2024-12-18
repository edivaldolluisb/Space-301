import { X, AtSign, KeyRound, Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "@/components/button";

interface LoginComponentProps {
  closeLoginComponent: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  setCompanyEmail: (email: string) => void;
  setCompanyPassword: (password: string) => void;
  error: string | null;
  isLoading: boolean;
}

export function LoginComponent({
  closeLoginComponent,
  createTrip,
  setCompanyEmail,
  setCompanyPassword,
  error,
  isLoading,
}: LoginComponentProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Entrar</h2>
            <button 
              onClick={closeLoginComponent}
              disabled={isLoading}
              className="hover:bg-zinc-800 rounded-md p-1 transition-colors"
            >
              <X className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Bem vindo de volta, tudo está no seu devido lugar
          </p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
            <AtSign className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="E-mail de login"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={event => setCompanyEmail(event.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
            <KeyRound className="text-zinc-400 size-5" />
            <input
              type="password"
              name="password"
              placeholder="Password de login"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={event => setCompanyPassword(event.target.value)}
              disabled={isLoading}
              required
              minLength={6}
            />
          </div>

          <Button 
            type="submit" 
            size="full"
            disabled={isLoading}
            className="flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Entrando...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}