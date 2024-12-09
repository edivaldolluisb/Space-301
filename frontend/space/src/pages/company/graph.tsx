"use client"

import { TrendingUp, Gauge } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis, ReferenceLine,LabelList } from "recharts"

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
	const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
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
				// localhost:8080/api/v1/launches/1/nave/null/velocidade
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
	}, [])

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
				<CardDescription>{formatDate(startDate)}</CardDescription>
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
			const month = date.toLocaleString("default", { month: "long" }); // Exemplo: "January"
			
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
	}, []);

	if (temperatureData.length === 0) {
		return (
		  <Card>
			<CardHeader>
			  <CardTitle>Temperatura</CardTitle>
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
		  <CardTitle>Temperatura</CardTitle>
		  <CardDescription>{`Máxima: ${maxTemp?.toFixed(2)}°`}</CardDescription>
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
				tickFormatter={(value) => value.slice(0, 3)}
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
		  {`Temperatura Média: ${averageTemp?.toFixed(2)}° | Temperatura Máxima: ${maxTemp?.toFixed(2)}°`} <TrendingUp className="h-4 w-4" />
		  </div>
		  <div className="leading-none text-muted-foreground">
		  Showing total temperatures for the period
		  </div>
		</CardFooter>
	  </Card>
	)
  }