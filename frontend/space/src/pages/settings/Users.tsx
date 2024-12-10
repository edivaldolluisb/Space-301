import { Plus, Siren, User, Search } from "lucide-react";
import { FormEvent, useState, useEffect } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { Activities } from "./ListUsers";
import { DestinationAndDateHeader } from "../../components/destination-and-date-header";

import { api } from "../../lib/axios";


interface User {
    id: number | string;
    name: string;
    email: string;
    password: string;
    role: string;
}

export function Users() {
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)


    const [usersList, setUsersList] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [userSearchName, setUserSearchName] = useState<string>("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);



    function openCreateUserModal() {
        setIsCreateActivityModalOpen(true)
    }


    const fetchUsers = async () => {
        try {
            const response = await api.get('/user');
            return response.data

        } catch (error) {
            console.log("Erro ao buscar utilizadores:", error)
            return null
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await fetchUsers();
            setIsLoading(false);

            console.log("resultados de fetch da api", result)
            if (result && result.length > 0) {
                setUsersList(result)
                console.log("resultados de fetch da api", usersList)
            }

        };

        fetchData();
    }, []);


    const handleUserClick = (userId: number | string) => {
        console.log("Usuário selecionado:", userId);
        const user = usersList.find((user) => user.id === userId);
        if (user) {
            setSelectedUser(user);
        }
    };

    const filteredUsers = usersList.filter(user =>
        user.name.toLowerCase().includes(userSearchName.toLowerCase())
    );


    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <DestinationAndDateHeader />

            <main className="flex gap-16 px-4">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">Utilizadores</h2>

                        <button onClick={openCreateUserModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                            <Plus className="size-5" />
                            Criar novo utilizador
                        </button>
                    </div>
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
                        <Search className="text-zinc-400 size-5" />
                        <input
                            type="text"
                            name="user"
                            placeholder="Procurar utilizador"
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                            onChange={event => setUserSearchName(event.target.value)}
                        />
                    </div>

                    <Activities users={filteredUsers} onUserClick={handleUserClick} />
                </div>

                {selectedUser && (
                    <>
                        <div className="w-80 space-y-6">
                            <div className="space-y-6">
                                <h2 className="font-semibold text-xl">Dados do Utilizador</h2>

                                <div className="space-y-5">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="space-y-1.5">
                                            <span className="block font-medium text-zinc-100">Nome do utilizador</span>

                                            <span className="text-sm text-zinc-400 truncate hover:text-zinc-200">{selectedUser.name}</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-zinc-800" />
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="space-y-1.5">
                                            <span className="block font-medium text-zinc-100">Email do utilizador</span>

                                            <span className="text-sm text-zinc-400 truncate hover:text-zinc-200">{selectedUser.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>
                )}
            </main>

            {/* {isCreateActivityModalOpen && (
                <CreateActivityModal
                    closeCreateLaunchModal={closeCreateLaunchModal}
                    setAstronauts={setAstronauts}
                    createLaunch={createLaunch}
                    error={error}
                    isLoading={isLoading}

                />
            )} */}
        </div>
    )
}