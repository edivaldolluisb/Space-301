
const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-lg font-semibold">Aveiro, Portugal</span>
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
            Página inicial 🚀
          </button>
        </div>

        {/* Settings card */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold mb-6">Definições</h1>

          {/* Dados de registo */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Dados de registo</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Nome da empresa</label>
                <input
                  type="text"
                  placeholder="Nome da empresa"
                  className="w-full bg-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  placeholder="emaildaempresa@space.com"
                  className="w-full bg-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Endereço</label>
                <input
                  type="text"
                  placeholder="endereço da empresa x, endereço completo"
                  className="w-full bg-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Chave de acesso */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Chave de acesso</h2>
            <div className="flex items-center space-x-4">
              <input
                type="password"
                value="********************"
                disabled
                className="w-full bg-gray-700 p-3 rounded focus:outline-none"
              />
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
                Copiar
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
                Ver chave
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
                Gerar nova chave
              </button>
            </div>
          </div>

          {/* Ações */}
          <div className="flex justify-between mt-8">
            <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">
              Atualizar dados
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
              Ver funcionários
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
