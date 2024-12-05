import { DestinationAndDateHeader } from "@/components/destination-and-date-header";
import { api } from "@/lib/axios";
import { User, AtSign, KeyRound, MapPin, ClipboardCopy, Eye, RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";

export default function SpaceSettings() {
    const [read, setRead] = useState(true);
    const onClickRead = () => {
        setRead((prev) => !prev);
    };

    const [seePassword, setSeePassword] = useState(false);
    const onClickSeePassword = () => {
        setSeePassword((prev) => !prev);
    };

    // Array com dados fictícios
    const [fakeData, setFakeData] = useState({
        companyName: "SpaceTech Solutions",
        email: "spacetech@empresa.com",
        address: "Rua das Inovações, 123, Lisboa, Portugal",
        accessKey: "ABCD1234EFGH5678",
    });

    const [formData, setFormData] = useState({
        companyName: fakeData.companyName,
        email: fakeData.email,
        address: fakeData.address,
    });

    const fetchCompany = async () => {
        try {
            const response = await api.get("/user/1");
            if (!response) {
                throw new Error("Erro ao buscar dados");
            }
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            alert("Erro ao buscar dados.");
            return null;
        }
    }    

    const [accessKey, setAccessKey] = useState(fakeData.accessKey);

    const generateNewKey = async () => {
        const newKey = Math.random().toString(36).substr(2, 16); // Gera uma chave aleatória
        setAccessKey(newKey);
        const companyDetails = {
            name: formData.companyName,
            email: formData.email,
            address: formData.address,
            password: newKey,
        }
        // Atualiza a chave de acesso na API
        try {
            const response = await api.put("/user/1", companyDetails);
            if (!response) {
                throw new Error("Erro ao atualizar chave de acesso");
            }
            alert("Chave de acesso atualizada com sucesso!");
        } catch (error) {
            console.error("Erro ao gerar nova chave:", error);
            alert("Erro ao gerar nova chave.");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(accessKey)
            .then(() => {
                alert("Chave copiada com sucesso!"); // Exibe uma mensagem de sucesso
            })
            .catch((err) => {
                console.error("Erro ao copiar a chave: ", err);
                alert("Erro ao copiar a chave.");
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchCompany();
            if (result) {
                setFormData(result);
            }
        }

        fetchData();
        
    }, []);
    
    return (
        <>
            <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
                <DestinationAndDateHeader />

                <main className="flex gap-16 px-4">
                    <div className="flex-1 space-y-6">
                        <div className="flex items">
                            <div>
                                <h1 className="text-3xl font-semibold">Definições</h1>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h2>Dados de registo</h2>
                            </div>
                            <div
                                className={
                                    read
                                        ? "flex items-center bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2"
                                        : "flex items-center bg-zinc-950 border border-lime-300 rounded-md px-4 py-2"
                                }
                            >
                                <User className="text-zinc-500 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Nome da Empresa"
                                    value={formData.companyName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, companyName: e.target.value })
                                    }
                                    className="w-full bg-transparent border-none focus:outline-none placeholder-zinc-500"
                                    readOnly={read}
                                />
                            </div>
                            <div
                                className={
                                    read
                                        ? "flex items-center bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2"
                                        : "flex items-center bg-zinc-950 border border-lime-300 rounded-md px-4 py-2"
                                }
                            >
                                <AtSign className="text-zinc-500 mr-2" />
                                <input
                                    type="email"
                                    placeholder="E-mail da Empresa"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full bg-transparent border-none focus:outline-none placeholder-zinc-500"
                                    readOnly={read}
                                />
                            </div>
                            <div
                                className={
                                    read
                                        ? "flex items-center bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2"
                                        : "flex items-center bg-zinc-950 border border-lime-300 rounded-md px-4 py-2"
                                }
                            >
                                <MapPin className="text-zinc-500 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Endereço Completo"
                                    value={formData.address}
                                    onChange={(e) =>
                                        setFormData({ ...formData, address: e.target.value })
                                    }
                                    className="w-full bg-transparent border-none focus:outline-none placeholder-zinc-500"
                                    readOnly={read}
                                />
                            </div>
                        </div>
                        {/* Chave de Acesso */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Chave de acesso</h3>
                            <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
                                <div className="flex items-center bg-zinc-900 rounded-md px-4 py-2">
                                    <KeyRound className="text-zinc-500 mr-2" />
                                    <input
                                        type={seePassword ? "text" : "password"}
                                        value={accessKey}
                                        className="bg-transparent border-none focus:outline-none placeholder-zinc-500"
                                        readOnly
                                    />
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-px py-2 bg-zinc-800" />
                                    <button
                                        className="bg-zinc-800 text-zinc-200 px-4 py-2 rounded-md hover:bg-lime-300 hover:text-black rounded-lg px-5 font-medium flex items-center justify-center gap-2"
                                        onClick={() => copyToClipboard()}
                                    >
                                        Copiar
                                        <ClipboardCopy className="size-5" />
                                    </button>
                                    <button
                                        className="bg-zinc-800 text-zinc-200 px-4 py-2 rounded-md hover:bg-lime-300 hover:text-black rounded-lg px-5 font-medium flex items-center justify-center gap-2"
                                        onClick={() => onClickSeePassword()}
                                    >
                                        Ver chave
                                        <Eye className="size-5" />
                                    </button>
                                    <button
                                        className="bg-zinc-800 text-zinc-200 px-4 py-2 rounded-md hover:bg-lime-300 hover:text-black rounded-lg px-5 font-medium flex items-center justify-center gap-2"
                                        onClick={ generateNewKey}
                                    >
                                        Gerar nova chave
                                        <RefreshCcw className="size-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Botões */}
                        <div className="flex space-x-4">
                            <button
                                className="w-full bg-zinc-900 shadow-shape px-6 py-2 rounded-md hover:bg-lime-300 hover:text-black"
                                onClick={() => onClickRead()}
                            >
                                Atualizar dados
                            </button>
                            <button className="w-full bg-zinc-900 shadow-shape px-6 py-2 rounded-md hover:bg-zinc-700">
                                Ver funcionários
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}