import { CheckCircle2, CircleDashed, X, UserCog, Snail, Ruler, Thermometer } from "lucide-react";
import { Button } from "../../components/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { id } from "react-day-picker/locale";

interface RocketDatas {
    id: number;
    speed: number;
    altitude: number;
    internal_temperature: number;
    external_temperature: number;
    generated_energy: number;
    battery_level: number;
    suply_level: number;
    signal_quality: number;
    internal_pressure: number;
    external_pressure: number;
}

export function ListTelemetricData() {
    const [launchedata, setLauncheData] = useState<RocketDatas[]>([])

    useEffect(() => {
        // api.get(`trips/${tripId}/launch`).then(response => setParticipants(response.data.launch))

        const data = {
            id: 1,
            speed: 100,
            altitude: 100,
            internal_temperature: 100,
            external_temperature: 100,
            generated_energy: 100,
            battery_level: 100,
            suply_level: 100,
            signal_quality: 100,
            internal_pressure: 100,
            external_pressure: 100,
        }
        setLauncheData([data])
        console.log(launchedata)
    }, [])

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Dados telemetricos</h2>

            <div className="space-y-5">
                {launchedata.map(launch => (
                    <>
                        <div key={launch.id} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-100">Velocidade</span>
                                <span className="block text-sm text-zinc-400 truncate">
                                    {launch.speed} km/h
                                </span>
                            </div>
                            <Snail className="text-green-400 size-5 shrink-0" />
                        </div>
                        <div key={launch.id} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-100">Altitude</span>
                                <span className="block text-sm text-zinc-400 truncate">
                                    {launch.altitude} km
                                </span>
                            </div>
                            <Ruler className="text-green-400 size-5 shrink-0" />
                        </div>
                        <div key={launch.id} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-100">Temperatura interna</span>
                                <span className="block text-sm text-zinc-400 truncate">
                                    {launch.internal_temperature} ºC
                                </span>
                            </div>
                            <Thermometer className="text-green-400 size-5 shrink-0" />
                        </div>
                        <div key={launch.id} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-100">Temperatura externa</span>
                                <span className="block text-sm text-zinc-400 truncate">
                                    {launch.external_temperature} ºC
                                </span>
                            </div>
                            <Thermometer className="text-green-400 size-5 shrink-0" />
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}