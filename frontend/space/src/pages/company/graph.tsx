"use client"

import { TrendingUp, Gauge, Thermometer } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis, LabelList } from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"

import { useState, useEffect } from "react";
import { api } from "../../lib/axios";

interface ApiResponseData {
	_value: number;
	_field: string;
	_time: string;
}


interface SpeedData {
	day: string;
	time: string;
	speed: number;
}


// Função para formatar a data
function formatDate(date: Date): string {
	const options: Intl.DateTimeFormatOptions = {
		day: "numeric", month: "long",
		//  year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	};
	return new Intl.DateTimeFormat("pt-PT", options).format(date);
}

const chartConfig = {
	speed: {
		label: "Speed",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig

export function SpeedGraph({ launchId }: { launchId: string }) {
	const [speedData, setSpeedData] = useState<SpeedData[]>([]);
	const [averageSpeed, setAverageSpeed] = useState<number | null>(null);
	const [maxSpeed, setMaxSpeed] = useState<number | null>(null);
	const [startDate, setStartDate] = useState<Date>(new Date());
	const [endDate, setEndDate] = useState<Date>(new Date());



	useEffect(() => {
		const fetchSpeedData = async () => {
			try {				
				const response = await api.get(`/launches/${launchId}/nave/null/velocidade`);
				const formattedData = response.data.map((item: ApiResponseData) => ({
					day: `${new Date(item._time).getHours()}:${new Date(item._time).getMinutes()}`,
					speed: item._value,
					time: item._time
				}));
				setSpeedData(formattedData);

				console.log("Speed data:", response.data)
				// Calcular média e máximo
				const totalSpeed = formattedData.reduce((sum: number, item: SpeedData) => sum + item.speed, 0);
				const avgSpeed = totalSpeed / formattedData.length;
				const maxSpeed = Math.max(...formattedData.map((item: SpeedData) => item.speed));

				setAverageSpeed(avgSpeed);
				setMaxSpeed(maxSpeed);


				// Calcular as datas inicial e final
				const start = new Date(formattedData[0].time);
				const end = new Date(formattedData[formattedData.length - 1].time);
				setStartDate(start);
				setEndDate(end);

			} catch (error) {
				console.log("Erro ao buscar velocidade:", error)
				return null
			}

		}
		fetchSpeedData()

		// 🙃
		const intervalId = setInterval(fetchSpeedData, 120000);

		return () => clearInterval(intervalId);
	}, [launchId])

	if (speedData.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Velocidade</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Carregando dados ou nenhum dado disponível.</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Velocidade</CardTitle>
				<CardDescription>{formatDate(startDate)} - {formatDate(endDate)}</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={speedData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="day"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value}
						//   tickFormatter={(value) => value.slice(0, 3)}
						/>
						<YAxis
							tickLine={true}
							axisLine={false}
							tickMargin={40}
							tickFormatter={(value) => value}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Line
							dataKey="speed"
							type="natural"
							stroke="var(--color-speed)"
							strokeWidth={2}
							dot={false}
						/>

					</LineChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Velocidade média hoje: {averageSpeed?.toFixed(2)} | Velocidade média:{" "}
					{maxSpeed?.toFixed(2)} <Gauge className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Apresentado total de velocidades para o período
				</div>
			</CardFooter>
		</Card>
	)
}


interface TemperatureData {
	month: string;
	temperature: number;
}

const tempConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig
export function TemperatureGraph({ launchId }: { launchId: string }) {
	const [temperatureData, setTemperatureData] = useState<TemperatureData[]>([]);
	const [averageTemp, setAverageTemp] = useState<number | null>(null);
	const [maxTemp, setMaxTemp] = useState<number | null>(null);

	useEffect(() => {
		const fetchTemperatureData = async () => {
			try {
				// Endpoint para obter as temperaturas
				const response = await api.get(`/launches/${launchId}/nave/null/temperaturaAtual`);
				const formattedData = response.data.map((item: ApiResponseData) => {
					// Obtém o mês da data
					const date = new Date(item._time);
					const month = `${date.getMinutes()}`;

					return {
						month,
						temperature: item._value
					};
				});
				setTemperatureData(formattedData);

				// Calcular média e máximo
				const totalTemp = formattedData.reduce((sum: number, item: TemperatureData) => sum + item.temperature, 0);
				const avgTemp = totalTemp / formattedData.length;
				const maxTemp = Math.max(...formattedData.map((item: TemperatureData) => item.temperature));

				setAverageTemp(avgTemp);
				setMaxTemp(maxTemp);

			} catch (error) {
				console.log("Erro ao buscar temperatura:", error);
			}
		};
		fetchTemperatureData();


		// 🙃
		const intervalId = setInterval(fetchTemperatureData, 120000);

		return () => clearInterval(intervalId);

	}, [launchId]);

	if (temperatureData.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Temperatura Interna</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Carregando dados ou nenhum dado disponível.</p>
				</CardContent>
			</Card>
		);
	}
	return (
		<Card>
			<CardHeader>
				<CardTitle>Temperatura Interna</CardTitle>
				<CardDescription>{`Máxima: ${maxTemp?.toFixed(2)}K`}  </CardDescription>
				{/* {formatDate(startTempDate)} - {formatDate(endTempDate)} */}
			</CardHeader>
			<CardContent>
				<ChartContainer config={tempConfig}>
					<BarChart accessibilityLayer data={temperatureData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 2)}
						/>

						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar dataKey="temperature" fill="var(--color-desktop)" radius={8} />
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					{`Temperatura Média: ${averageTemp?.toFixed(2)}K | Temperatura Máxima: ${maxTemp?.toFixed(2)}K`} <Thermometer className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total temperatures for the period
				</div>
			</CardFooter>
		</Card>
	)
}



// grafico de altitude:

interface AltitudeData {
	day: string;
	altitude: number;
	time: string;
}

const altitudeConfig = {
	altitude: {
		label: "Altitude",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export function AltitudeGraph({ launchId }: { launchId: string }) {
	const [altitudeData, setAltitudeData] = useState<AltitudeData[]>([]);
	const [averageAltitude, setAverageAltitude] = useState<number | null>(null);
	const [maxAltitude, setMaxAltitude] = useState<number | null>(null);

	useEffect(() => {
		const fetchAltitudeData = async () => {
			try {
				const response = await api.get(`/launches/${launchId}/nave/null/altitude`);
				const formattedData = response.data.map((item: ApiResponseData) => ({
					day: `${new Date(item._time).getHours()}:${new Date(item._time).getMinutes()}`,
					altitude: item._value,
					time: item._time,
				}));
				setAltitudeData(formattedData);

				const totalAltitude = formattedData.reduce((sum: number, item: AltitudeData) => sum + item.altitude, 0);
				const avgAltitude = totalAltitude / formattedData.length;
				const maxAltitude = Math.max(...formattedData.map((item: AltitudeData) => item.altitude));

				setAverageAltitude(avgAltitude);
				setMaxAltitude(maxAltitude);
			} catch (error) {
				console.log("Erro ao buscar altitude:", error);
			}
		};
		fetchAltitudeData();

		const intervalId = setInterval(fetchAltitudeData, 120000);

		return () => clearInterval(intervalId);
	}, [launchId]);

	if (altitudeData.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Altitude</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Carregando dados ou nenhum dado disponível.</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Altitude</CardTitle>
				<CardDescription>
					{`Média: ${averageAltitude?.toFixed(2)} | Máxima: ${maxAltitude?.toFixed(2)}`}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={altitudeConfig}>
					<LineChart data={altitudeData} margin={{ left: 12, right: 12 }}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
						<YAxis tickLine={true} axisLine={false} tickMargin={15} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Line dataKey="altitude" type="natural" stroke="var(--color-altitude)" strokeWidth={2} dot={false} />
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}


// grafiico da pressão:

interface PressureData {
	day: string;
	pressure: number;
	time: string;
}

const pressureConfig = {
	pressure: {
		label: "Pressão",
		color: "hsl(var(--chart-3))",
	},
} satisfies ChartConfig;

export function PressureGraph({ launchId }: { launchId: string }) {
	const [pressureData, setPressureData] = useState<PressureData[]>([]);
	const [averagePressure, setAveragePressure] = useState<number | null>(null);
	const [maxPressure, setMaxPressure] = useState<number | null>(null);

	useEffect(() => {
		const fetchPressureData = async () => {
			try {
				const response = await api.get(`/launches/${launchId}/nave/null/pressaoAtual`);
				const formattedData = response.data.map((item: ApiResponseData) => ({
					day: `${new Date(item._time).getHours()}:${new Date(item._time).getMinutes()}`,
					pressure: item._value,
					time: item._time,
				}));
				setPressureData(formattedData);

				const totalPressure = formattedData.reduce((sum: number, item: PressureData) => sum + item.pressure, 0);
				const avgPressure = totalPressure / formattedData.length;
				const maxPressure = Math.max(...formattedData.map((item: PressureData) => item.pressure));

				setAveragePressure(avgPressure);
				setMaxPressure(maxPressure);
			} catch (error) {
				console.log("Erro ao buscar pressão:", error);
			}
		};
		fetchPressureData();

		const intervalId = setInterval(fetchPressureData, 120000);

		return () => clearInterval(intervalId);
	}, [launchId]);

	if (pressureData.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Pressão</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Carregando dados ou nenhum dado disponível.</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Pressão</CardTitle>
				<CardDescription>
					{`Média: ${averagePressure?.toFixed(2)} | Máxima: ${maxPressure?.toFixed(2)}`}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={pressureConfig}>
					<LineChart data={pressureData} margin={{ left: 12, right: 12 }}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
						<YAxis tickLine={true} axisLine={false} tickMargin={15} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Line dataKey="pressure" type="natural" stroke="var(--color-pressure)" strokeWidth={2} dot={true} />
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}


// grafico de oxigenio:

interface OxygenData {
	day: string;
	oxygen: number;
	time: string;
}

const oxygenConfig = {
	oxygen: {
		label: "Oxigênio",
		color: "hsl(var(--chart-4))",
	},
} satisfies ChartConfig;

export function OxygenGraph({ launchId }: { launchId: string }) {
	const [oxygenData, setOxygenData] = useState<OxygenData[]>([]);
	const [averageOxygen, setAverageOxygen] = useState<number | null>(null);
	const [maxOxygen, setMaxOxygen] = useState<number | null>(null);

	useEffect(() => {
		const fetchOxygenData = async () => {
			try {
				const response = await api.get(`/launches/${launchId}/nave/null/oxigenioAtual`);
				const formattedData = response.data.map((item: ApiResponseData) => ({
					day: `${new Date(item._time).getHours()}:${new Date(item._time).getMinutes()}`,
					oxygen: item._value,
					time: item._time,
				}));
				setOxygenData(formattedData);

				const totalOxygen = formattedData.reduce((sum: number, item: OxygenData) => sum + item.oxygen, 0);
				const avgOxygen = totalOxygen / formattedData.length;
				const maxOxygen = Math.max(...formattedData.map((item: OxygenData) => item.oxygen));

				setAverageOxygen(avgOxygen);
				setMaxOxygen(maxOxygen);
			} catch (error) {
				console.log("Erro ao buscar oxigênio:", error);
			}
		};
		fetchOxygenData();

		const intervalId = setInterval(fetchOxygenData, 120000);

		return () => clearInterval(intervalId);
	}, [launchId]);

	if (oxygenData.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Oxigênio</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Carregando dados ou nenhum dado disponível.</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Grafico de Oxigénio</CardTitle>
				<CardDescription>
					{`Média: ${averageOxygen?.toFixed(2)} | Máxima: ${maxOxygen?.toFixed(2)}`}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={oxygenConfig}>
					<LineChart data={oxygenData} margin={{ left: 12, right: 12 }}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
						<YAxis tickLine={true} axisLine={false} tickMargin={40} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Line dataKey="oxygen" type="natural" stroke="var(--color-oxygen)" strokeWidth={5} dot={false} />
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}


// grafico da temperatura externa:

interface ExternalTemperatureData {
  day: string;
  externalTemperature: number;
}

const externalTempConfig = {
  externalTemperature: {
    label: "Temperatura Externa",
    color: "hsl(var(--chart-5))",  // Pode personalizar a cor aqui
  },
} satisfies ChartConfig;

export function ExternalTemperatureGraph({ launchId }: { launchId: string }) {
  const [externalTemperatureData, setExternalTemperatureData] = useState<ExternalTemperatureData[]>([]);
  const [averageExternalTemperature, setAverageExternalTemperature] = useState<number | null>(null);
  const [maxExternalTemperature, setMaxExternalTemperature] = useState<number | null>(null);

  useEffect(() => {
    const fetchExternalTemperatureData = async () => {
      try {
        const response = await api.get(`/launches/${launchId}/nave/null/temperaturaExterna`);

        const formattedData = response.data.map((item: ApiResponseData) => {
          const date = new Date(item._time); 
          const hours = date.getHours().toString().padStart(2, "0"); 
          const minutes = date.getMinutes().toString().padStart(2, "0");

          return {
            day: `${hours}:${minutes}`, 
            externalTemperature: Number(item._value.toFixed(2)),
          };
        });
        setExternalTemperatureData(formattedData);

        // Calcular a média e a máxima das temperaturas
        const totalTemp = formattedData.reduce((sum: number, item: ExternalTemperatureData) => sum + item.externalTemperature, 0);
        const avgTemp = totalTemp / formattedData.length;
        const maxTemp = Math.max(...formattedData.map((item: ExternalTemperatureData) => item.externalTemperature));

        setAverageExternalTemperature(avgTemp);
        setMaxExternalTemperature(maxTemp);
      } catch (error) {
        console.log("Erro ao buscar temperatura externa:", error);
      }
    };
    fetchExternalTemperatureData();

    const intervalId = setInterval(fetchExternalTemperatureData, 120000);

    return () => clearInterval(intervalId);
  }, [launchId]);

  if (externalTemperatureData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Temperatura Externa</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Carregando dados ou nenhum dado disponível.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperatura Externa</CardTitle>
        <CardDescription>
          {`Média: ${averageExternalTemperature?.toFixed(2)}K | Máxima: ${maxExternalTemperature?.toFixed(2)}K`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={externalTempConfig}>
          <BarChart data={externalTemperatureData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="externalTemperature" fill="#ff5733" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
		A temperatura externa máxima do lançamento foi:{maxExternalTemperature?.toFixed(2)} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Apresentando todos dos dados da temperatura externa
        </div>
      </CardFooter>
    </Card>
  );
}

