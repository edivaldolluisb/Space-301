// import { DateRange } from "react-day-picker";
import { Button } from "../../components/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

export function NotFound() {

    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown === 1) {
                    clearInterval(timer);
                    navigate("/");
                    
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000); 

        return () => clearInterval(timer);
    }, []);


    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className="flex flex-col items-center gap-3">
                    <img src="/icons8-rocket-emoji-32.png" alt="Space301" />
                    <p className="text-zinc-300 text-lg">
                        Parece que você se perdeu no espaço! <br />
                        Em {countdown} segundos, você será redirecionado para terra firme.
                    </p>
                </div>


                <div className="grid grid-cols-2 gap-4">
                    
                    <div className="col-span-2 cursor-pointer">
                        <Link to="/">
                            <Button
                                variant="secondary"
                                size="full"
                                disabled={true}
                            >
                               Ir para Página Inicial
                            </Button>
                        </Link>
                    </div>
                </div>

                <p className="text-sm text-zinc-500">
                    Acedendo aos nossos serviços você automaticamente concorda <br />
                    com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e{" "}
                    <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
                </p>
            </div>
        </div>
    );
}