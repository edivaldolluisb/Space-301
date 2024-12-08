"use client"

import { TrendingUp, Gauge } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis, ReferenceLine } from "recharts"

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
import { time } from "console"



interface ApiResponseData {
	_value: number;
	_field: string;
	_time: string;
}


interface SpeedData {
	day: number;
	speed: number;
}


// Função para formatar a data
function formatDate(date: Date): string {
	const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
	return new Intl.DateTimeFormat("pt-BR", options).format(date);
}

const chartConfig = {
	speed: {
		label: "Speed",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig

export function SpeedGraph() {
	const [speedData, setSpeedData] = useState<SpeedData[]>([]);
	const [averageSpeed, setAverageSpeed] = useState<number | null>(null);
	const [maxSpeed, setMaxSpeed] = useState<number | null>(null);
	const [startDate, setStartDate] = useState<Date>(new Date());
	const [endDate, setEndDate] = useState<Date>(new Date());


	useEffect(() => {
		const fetchSpeedData = async () => {
			try {
				// localhost:8080/api/v1/launches/1/nave/null/velocidade
				const response = await api.get('/launches/1/nave/null/velocidade')
				const formattedData = response.data.map((item: ApiResponseData) => ({
					day: new Date(item._time).getDate(),
					speed: item._value,
					time: item._time
				}));
				setSpeedData(formattedData);

				console.log("Speed data:", response.data)
				// Calcular média e máximo
				const totalSpeed = formattedData.reduce((sum, item) => sum + item.speed, 0);
				const avgSpeed = totalSpeed / formattedData.length;
				const maxSpeed = Math.max(...formattedData.map((item) => item.speed));

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
				<CardDescription>{formatDate(startDate)} - {formatDate(endDate) || formatDate(new Date())}</CardDescription>
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
					Average speed today: {averageSpeed?.toFixed(2)} | Maximum speed:{" "}
					{maxSpeed?.toFixed(2)} <Gauge className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total speed for today
				</div>
			</CardFooter>
		</Card>
	)
}

const temperatureData = [
	{ day: 10, desktop: 186, mobile: 80 },
	{ day: 11, desktop: 305, mobile: 200 },
	{ day: 12, desktop: 237, mobile: 120 },
	{ day: 13, desktop: 73, mobile: 190 },
	{ day: 14, desktop: 209, mobile: 130 },
	{ day: 15, desktop: 214, mobile: 140 },
	{ day: 16, desktop: 389, mobile: 190 },
]

const temperatureConfig = {
	desktop: {
		label: "Externa",
		color: "hsl(var(--chart-1))",
	},
	mobile: {
		label: "Interna",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig

export function TemperatureGraph() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Temperatura</CardTitle>
				<CardDescription>10 - 16 Novembro de  2024</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={temperatureConfig}>
					<BarChart accessibilityLayer data={temperatureData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="day"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dashed" />}
						/>
						<Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
						<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					External temperature trending up by 10% today <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total data for the last 7 days
				</div>
			</CardFooter>
		</Card>
	)
}

