import { DestinationAndDateHeader } from "../components/destination-and-date-header";
import { Plus, X, Loader2, User, AtSign, KeyRound, MapPin, Eye, ClipboardCopy, RefreshCw, EyeOff } from "lucide-react";
import { Button } from "../components/button";
import { useState, useEffect } from "react";
import { api } from "../lib/axios";



interface FormErrors {
  name?: string;
  email?: string;
  address?: string;
  password?: string;
}


const SettingsPage = () => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateRandomKey = () => {
    const randomKey = Math.random().toString(36).slice(-12);
    console.log("Nova chave gerada:", randomKey);
    setFormData((prev) => ({ ...prev, password: randomKey }));
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const errors: FormErrors = {};
    if (!formData.name) errors.name = "Nome é obrigatório.";
    if (!formData.email.includes("@")) errors.email = "E-mail inválido.";
    if (!formData.address) errors.address = "Endereço é obrigatório.";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 2) {
      setFormErrors(errors);
      return;
    }
    
    const updatedData = { name: formData.name, email: formData.email, password: formData.password};
    try {
      const response = await updateUser("64db4558-bab7-4a4c-8adc-bdcdb7721db0", updatedData);

      if (response && response.data) {
        console.log("Usuário atualizado com sucesso:", response.data);
        const userData = response.data;
      }

    } catch (err) {
      console.error("Erro ao enviar os dados:", err);
    }

    console.log("Formulário enviado:", updatedData);
    setFormErrors({});
  };

  const updateUser = async (userId: string, updatedData: { name: string; email: string }) => {
    try {
      const response = await api.patch(`/user/${userId}`, updatedData);


      console.log("Resposta do servidor:", response);
      return response;
    } catch (err) {

      console.error("Erro ao enviar os dados:", err);
    }
  };




  const copyPasswordToClipboard = () => {
    console.log("Copiando senha para a área de transferência...");
    if (!formData.password) {
      console.log("Nenhuma senha disponível para copiar.");
      // alert("Nenhuma senha disponível para copiar.");
      return;
    }

    navigator.clipboard
      .writeText(formData.password)
      .then(() => {
        console.log("Senha copiada:", formData.password);
        // alert("Senha copiada com sucesso!");
      })
      .catch(() => {
        console.error("Erro ao copiar a senha.");
        // alert("Erro ao copiar a senha.");
      });
  };



  const fetchUserData = async () => {
    try {

      // const response = api.get('/user/1ba117d3-1b38-47a7-94a2-06a8638e7240');
      const response = await api.get('/user/64db4558-bab7-4a4c-8adc-bdcdb7721db0');
      const userData = response.data;

      console.log('Dados do utilizador:', userData);
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        address: userData.address || "",
        password: "",
      });
    } catch (err) {
      setError('Erro ao carregar os dados do utilizador');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);


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

            {/* <form onSubmit={handleSubmit} className="space-y-3"> */}
            <form className="space-y-3">
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
                <User className="text-zinc-400 size-5" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nome da empresa"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  disabled={isLoading}
                  required
                />
              </div>
              {/* {formErrors.name && <p className="text-red-400">{formErrors.name}</p>} */}

              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
                <AtSign className="text-zinc-400 size-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail da empresa"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  disabled={isLoading}
                  required
                  minLength={6}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
                <MapPin className="text-zinc-400 size-5" />
                <input
                  type="text"
                  name="address"
                  placeholder="Endereço da empresa"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  disabled={isLoading}
                  required
                  minLength={6}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, address: e.target.value }))
                  }

                />
              </div>

            </form>

            <div className="flex items-center justify-between">
              <h2 className="font-lg font-semibold">Chave de acesso</h2>
            </div>

            <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
              <div className="flex items-center gap-2 ">
                <KeyRound className="size-5 text-zinc-400" />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  placeholder="password da empresa"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 w-full "
                  disabled={isLoading}
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </div>

              <div className="flex items-center gap-5">
                <div className="w-px h-6 bg-zinc-800" />

                <Button variant="secondary">
                  <ClipboardCopy className="size-5" onClick={copyPasswordToClipboard} />
                  Copiar
                </Button>

                <Button variant="secondary"
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                >
                  {isPasswordVisible ? "Ocultar chave" : "Ver chave"}

                  {isPasswordVisible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </Button>

                <Button variant="secondary" onClick={generateRandomKey}>
                  Sugerir nova chave
                  <RefreshCw className="size-5" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-5">

              <Button
                // variant={isLoading ? "secondary" : "primary"} 
                variant="secondary"
                onClick={() => setIsLoading(!isLoading)}>
                {isLoading ? "Atualizar dados" : "Cancelar"}
              </Button>


              <div className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}>
                {!isLoading && (
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    type="submit"
                  >
                    Enviar
                  </Button>
                )}
              </div>

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