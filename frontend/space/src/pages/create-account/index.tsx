// import { DateRange } from "react-day-picker";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { auth } from "../../lib/axios";
import { LoginComponent } from "./Login";
import { RegisterComponent } from "./RegisterUser";

interface User {
  name: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export function AuthPage() {
  const navigate = useNavigate();
  const [isLoginComponentOpen, setIsLoginComponentOpen] = useState(false);
  const [isRegisterComponentOpen, setIsRegisterComponentOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");

  function openLoginComponent() {
    setIsLoginComponentOpen(true);
    setError(null);
  }

  function closeLoginComponent() {
    setIsLoginComponentOpen(false);
    setError(null);
  }

  function openRegisterComponent() {
    setIsRegisterComponentOpen(true);
    setError(null);
  }

  function closeRegisterComponent() {
    setIsRegisterComponentOpen(false);
    setError(null);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!companyName || !companyPassword || !companyEmail) {
      setError("Todos os campos são obrigatórios");
      setIsLoading(false);
      return;
    }

    try {
      const newUser: User = {
        name: companyName,
        email: companyEmail,
        password: companyPassword
      };

      await auth.register(newUser);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao registrar usuário");
    } finally {
      setIsLoading(false);
    }
  }

  async function loginTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!companyPassword || !companyEmail) {
      setError("Email e senha são obrigatórios");
      setIsLoading(false);
      return;
    }

    try {
      const credentials: LoginCredentials = {
        email: companyEmail,
        password: companyPassword
      };

      await auth.login(credentials);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/icons8-rocket-emoji-32.png" alt="Space301" />
          <p className="text-zinc-300 text-lg">
            Manage lunches and your rockets as you always wanted!
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={openLoginComponent} 
            disabled={isLoading}
          >
            {isLoading ? "Carregando..." : "Entrar"}
          </Button>
          <Button 
            onClick={openRegisterComponent} 
            variant="secondary" 
            disabled={isLoading}
          >
            Registrar
          </Button>
          <div className="col-span-2">
            <Button size="full" disabled={isLoading}>
              Visitante
            </Button>
          </div>
        </div>

        <p className="text-sm text-zinc-500">
          Acedendo aos nossos serviços você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e{" "}
          <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>
      </div>

      {isLoginComponentOpen && (
        <LoginComponent
          closeLoginComponent={closeLoginComponent}
          createTrip={loginTrip}
          setCompanyEmail={setCompanyEmail}
          setCompanyPassword={setCompanyPassword}
          error={error}
          isLoading={isLoading}
        />
      )}

      {isRegisterComponentOpen && (
        <RegisterComponent
          closeRegisterComponent={closeRegisterComponent}
          createTrip={createTrip}
          setCompanyName={setCompanyName}
          setCompanyEmail={setCompanyEmail}
          setCompanyPassword={setCompanyPassword}
          error={error}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}