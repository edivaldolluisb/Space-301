import { useState, useEffect } from "react";
import { MapPin, Calendar, Rocket } from "lucide-react";

export function VisitorHeader() {
  const [location, setLocation] = useState("Carregando localização...");
  const [currentDate, setCurrentDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Obter a localização do usuário via Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        )
          .then((response) => response.json())
          .then((data) => {
            const city = data.address.city || data.address.town || "Local desconhecido";
            const country = data.address.country || "País desconhecido";
            setLocation(`${city}, ${country}`);
          })
          .catch(() => setLocation("Localização não encontrada"));
      },
      () => setLocation("Permissão negada")
    );

    // Atualizar a data atual
    const today = new Date();
    const formattedDate = today.toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "long",
    });
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      {/* Localização */}
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{location}</span>
      </div>

      {/* Barra de busca */}
      <div className="flex items-center w-full max-w-md bg-zinc-950 px-3 py-2 rounded-md">
        <Rocket className="text-zinc-400 mr-2" />
        <input
          type="text"
          placeholder="Pesquisar..."
          className="w-full bg-transparent text-zinc-100 placeholder-zinc-400 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Data */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{currentDate}</span>
        </div>
        <div className="w-px h-6 bg-zinc-800" />
      </div>
    </div>
  );
}
