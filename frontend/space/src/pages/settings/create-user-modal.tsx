import { Calendar, X, Loader2, User, MapPin, AtSign, KeyRound } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";


interface CreateUserModalProps {
	closeCreateUserModal: () => void;
	createUser: (event: FormEvent<HTMLFormElement>, user: User) => void;
	error: string | null;
	isLoading: boolean;
}


interface User {
	id: number | string;
	name: string;
	email: string;
	password: string;
	role: string;
}


export function CreateUserModal({
	closeCreateUserModal,
	createUser,
	error,
	isLoading,
}: CreateUserModalProps) {
	const [user, setUser] = useState<User>({
		id: "",
		name: "",
		email: "",
		password: "",
		role: "user", // Valor padrão
	});


	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });
	};


	// const [selectedUser, setSelectedUser] = useState<User | null>(null);

	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
			<div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<h2 className="font-lg font-semibold">Registar Utilizador</h2>
						<button>
							<X className="size-5 text-zinc-400" onClick={closeCreateUserModal} />
						</button>
					</div>

					<p className="text-sm text-zinc-400">
						Preencha os detalhes do utilizador para prosseguir.
					</p>
				</div>

				{error && (
					<div className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg text-sm">
						{error}
					</div>
				)}

				<form onSubmit={(e) => createUser(e, user)} className="space-y-3">
					<div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
						<User className="text-zinc-400 size-5" />
						<input
							type="text"
							name="name"
							placeholder="Nome do Utilizador"
							className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
							onChange={handleInputChange}
							disabled={isLoading}
						// required
						/>
					</div>

					<div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
						<AtSign className="text-zinc-400 size-5" />
						<input
							type="email"
							name="email"
							placeholder="Email do Utilizador"
							className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
							onChange={handleInputChange}
							disabled={isLoading}
						// required
						/>
					</div>


					<div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
						<KeyRound className="text-zinc-400 size-5" />
						<input
							type="password"
							name="password"
							placeholder="Palavra-passe do Utilizador"
							className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
							onChange={handleInputChange}
							disabled={isLoading}
						// required
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
								Registrando...
							</>
						) : (
							"Registrar Utilizador"
						)}
					</Button>
				</form>

			</div>
		</div>
	)
}