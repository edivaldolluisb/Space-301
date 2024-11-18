"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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
const chartData = [
  { day: 10, speed: 186 },
  { day: 11, speed: 305 },
  { day: 12, speed: 237 },
  { day: 13, speed: 73 },
  { day: 14, speed: 209 },
  { day: 15, speed: 214 },
  { day: 16, speed: 214 },
]

const chartConfig = {
  speed: {
    label: "Speed",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function SpeedGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Velocidade</CardTitle>
        <CardDescription>10 - 16 Novembro de  2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
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
          Trending up by 5.2% today <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total speed for the this week
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

