import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { registerUser, loginUser } from "../../lib/axios";
import { Button } from "../../components/button";

import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { LoginModal } from "./login";

export function CreateTripPage() {
  const navigate = useNavigate()
  // const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");


  function openLoginModal() {
    setIsLoginModalOpen(true)
  }

  function closeLoginModal() {
    setIsLoginModalOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }


  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!companyName || !companyPassword || !companyEmail) {
      return
    }

    console.log("Creating trip...")
    const newUser = ({
      "name": companyName,
      "email": companyEmail,
      "password": companyPassword
    })
    registerUser(newUser)
      .then(response => console.log('User registered successfully:', response))
      .catch(error => console.error('Registration failed:', error.message));
    console.log("finished")

  }

  async function loginTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!companyPassword || !companyEmail) {
      return
    }

    console.log("Iniciando sessão...")
  }


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
          <Button onClick={openLoginModal} >Entrar</Button>
          <Button onClick={openConfirmTripModal} variant="secondary">Registar</Button>
          <div className="col-span-2">
            <Button size="full">Visitante</Button>
          </div>
        </div>

        <p className="text-sm text-zinc-500">
          Acedendo aos nossos serviços você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>

      </div>


      {isLoginModalOpen && (
        <LoginModal
          closeConfirmTripModal={closeLoginModal}
          createTrip={loginTrip}
          setCompanyEmail={setCompanyEmail}
          setCompanyPassword={setCompanyPassword}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setCompanyName={setCompanyName}
          setCompanyEmail={setCompanyEmail}
          setCompanyPassword={setCompanyPassword}
        />
      )}


    </div>
  );
}
