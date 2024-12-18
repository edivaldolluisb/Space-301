import { DestinationAndDateHeader } from "@/components/destination-and-date-header";
import { User, AtSign, KeyRound, MapPin, Eye, ClipboardCopy, RefreshCw, EyeOff } from "lucide-react";
import { Button } from "@/components/button";
import React, { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { Link } from "react-router-dom";



interface FormErrors {
  name?: string;
  email?: string;
  address?: string;
  password?: string;
}


const SettingsPage = () => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem('userId');

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
      return;
    }
    
    const updatedData = { name: formData.name, email: formData.email, password: formData.password};
    try {
      if (!userId) {
        console.error("ID do utilizador não encontrado.");
        return;
      }
      const response = await updateUser(userId, updatedData);

      if (response && response.data) {
        console.log("Usuário atualizado com sucesso:", response.data);
      }

    } catch (err) {
      console.error("Erro ao enviar os dados:", err);
    }

    console.log("Formulário enviado:", updatedData);
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
      const response = await api.get(`/user/${userId}`);
      const userData = response.data;

      // console.log('Dados do utilizador:', userData);
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        address: userData.address || "",
        password: "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      // setIsLoading(false);
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

              <Link to={"/settings/users"} className="">
              <Button variant="secondary">
                Ver funcionários
              </Button>
              </Link>
            </div>

          </div>

        </div>
      </main>

    </div>
  )

};

export default SettingsPage;