import { DestinationAndDateHeader } from "../components/destination-and-date-header";
import { Plus, X, Loader2, User, AtSign, KeyRound, MapPin, Eye, ClipboardCopy, RefreshCw } from "lucide-react";
import { Button } from "../components/button";


const SettingsPage = () => {


  return (

    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Definições</h2>
          </div>

          <div className="py-5 px-6 space-y-5 w-full">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-lg font-semibold">Dados de Registo</h2>
              </div>
            </div>

            {/* <form onSubmit={createTrip} className="space-y-3"> */}
            <form className="space-y-3">
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
                <User className="text-zinc-400 size-5" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nome da empresa"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  // onChange={event => setCompanyName(event.target.value)}
                  // disabled={isLoading}
                  required
                />
              </div>

              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <AtSign className="text-zinc-400 size-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail da empresa"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  // onChange={event => setCompanyEmail(event.target.value)}
                  // disabled={isLoading}
                  required
                />
              </div>
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <MapPin className="text-zinc-400 size-5" />
                <input
                  type="text"
                  name="address"
                  placeholder="Endereço da empresa"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  // onChange={event => setCompanyPassword(event.target.value)}
                  // disabled={isLoading}
                  required
                  minLength={6}
                />
              </div>

            </form>

            <div className="flex items-center justify-between">
              <h2 className="font-lg font-semibold">Chave de acesso</h2>
            </div>

            <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="size-5 text-zinc-400" />
                <span className="text-zinc-100">endereço</span>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-px h-6 bg-zinc-800" />

                <Button variant="secondary">
                  <ClipboardCopy className="size-5" />
                  Copiar
                </Button>

                <Button variant="secondary">
                  Ver chave
                  <Eye className="size-5" />
                </Button>

                <Button variant="secondary">
                  Sugerir nova chave
                  <RefreshCw className="size-5" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-5">

              <Button variant="secondary">
                Atualizar dados
              </Button>

              <Button variant="secondary">
                Ver funcionários
              </Button>
            </div>

          </div>

        </div>
      </main>

    </div>
  )

  // return (
  //   <div className="min-h-screen bg-gray-900 text-white">
  //     <div className="container mx-auto p-6">
  //       {/* Top bar */}
  //       <div className="flex justify-between items-center mb-8">
  //         <span className="text-lg font-semibold">Aveiro, Portugal</span>
  //         <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
  //           Página inicial 🚀
  //         </button>
  //       </div>

  //       {/* Settings card */}
  //       <div className="bg-gray-800 rounded-lg shadow-md p-6">
  //         <h1 className="text-xl font-bold mb-6">Definições</h1>

  //         {/* Dados de registo */}
  //         <div className="mb-8">
  //           <h2 className="text-lg font-semibold mb-4">Dados de registo</h2>
  //           <div className="space-y-4">
  //             <div>
  //               <label className="block text-sm mb-2">Nome da empresa</label>
  //               <input
  //                 type="text"
  //                 placeholder="Nome da empresa"
  //                 className="w-full bg-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               />
  //             </div>
  //             <div>
  //               <label className="block text-sm mb-2">Email</label>
  //               <input
  //                 type="email"
  //                 placeholder="emaildaempresa@space.com"
  //                 className="w-full bg-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               />
  //             </div>
  //             <div>
  //               <label className="block text-sm mb-2">Endereço</label>
  //               <input
  //                 type="text"
  //                 placeholder="endereço da empresa x, endereço completo"
  //                 className="w-full bg-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               />
  //             </div>
  //           </div>
  //         </div>

  //         {/* Chave de acesso */}
  //         <div>
  //           <h2 className="text-lg font-semibold mb-4">Chave de acesso</h2>
  //           <div className="flex items-center space-x-4">
  //             <input
  //               type="password"
  //               value="********************"
  //               disabled
  //               className="w-full bg-gray-700 p-3 rounded focus:outline-none"
  //             />
  //             <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
  //               Copiar
  //             </button>
  //             <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
  //               Ver chave
  //             </button>
  //             <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
  //               Gerar nova chave
  //             </button>
  //           </div>
  //         </div>

  //         {/* Ações */}
  //         <div className="flex justify-between mt-8">
  //           <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">
  //             Atualizar dados
  //           </button>
  //           <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
  //             Ver funcionários
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );



};

export default SettingsPage;