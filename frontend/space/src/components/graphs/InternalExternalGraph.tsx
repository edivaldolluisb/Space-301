"use client"

// @ts-expect-error import ainda não utilizado
import React from "react"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { useState, useEffect, useMemo } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { api, auth } from "@/lib/axios";
import { getEndpoint } from "@/components/utils/getEndpoint";

interface ApiResponseData {
    _value: number;
    _field: string;
    _time: string;
}

// internal and external temperature graph

interface TemperatureData {
    date: string
    temperaturaInterna: number
    temperaturaExterna: number
}


const { authenticated } = auth.isAuthenticated();

const internal_externalConfig = {
    visitors: {
        label: "Visitors",
    },
    temperaturaInterna: {
        label: "Temperatura Interna",
        color: "hsl(var(--chart-1))",
    },
    temperaturaExterna: {
        label: "Temperatura Externa",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig
export function InternalExternalGraph({ launchId }: { launchId: string }) {
    const [timeRange, setTimeRange] = useState("20m")

    const [data, setData] = useState<TemperatureData[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const fetchData = async () => {
            try {

                setIsLoading(true)
                const internalEndpoint = getEndpoint('temperaturaAtual', authenticated, launchId)
                const externalEndpoint = getEndpoint('temperaturaExterna', authenticated, launchId)

                const [internalTempResponse, externalTempResponse] = await Promise.all([
                    api.get(internalEndpoint),
                    api.get(externalEndpoint),
                ])


                if (!internalTempResponse.data || !externalTempResponse.data) {
                    throw new Error("Erro ao buscar os dados de temperatura")
                }


                const internalTempData = internalTempResponse.data
                const externalTempData = externalTempResponse.data

                const formattedData = internalTempData.map((item: ApiResponseData, index: number) => ({
                    date: item._time,
                    temperaturaInterna: item._value,
                    temperaturaExterna: externalTempData[index]?._value || 0,
                }))

                // Atualiza o estado com os dados formatados
                setData(formattedData)
                setIsLoading(false)
            } catch (error) {
                console.error("Erro ao buscar os dados:", error)
                setIsLoading(false)
            }
        }


        const interval = setInterval(fetchData, 120000);
        fetchData();
        return () => clearInterval(interval);
    }, [launchId])

    const filteredData = useMemo(() => {
        const now = new Date();
        const timeDiff = { "5m": 5 * 60 * 1000, "10m": 10 * 60 * 1000, "20m": 20 * 60 * 1000 };
        // @ts-expect-error timeDiff[timeRange] não é um valor válido # TODO colocar o tipo de dados 
        return data.filter(item => now.getTime() - new Date(item.date).getTime() <= (timeDiff[timeRange] || 20 * 60 * 1000));
    }, [data, timeRange]);


    if (!data.length) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Temperatura</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <p className="text-zinc-500 text-sm">Carregando dados...</p>
                    ) : (
                        <p className="text-zinc-500 text-sm">Nenhum dado disponível.</p>
                    )}
                </CardContent>
            </Card>
        );
    }


    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Temperatura interna e externa</CardTitle>
                    <CardDescription>
                        Apresentando os dados da temperatura interna e externa do foguete
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 5 min" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="5m" className="rounded-lg">
                            Últimos 5 min
                        </SelectItem>
                        <SelectItem value="10m" className="rounded-lg">
                            Últimos 10 min
                        </SelectItem>
                        <SelectItem value="20m" className="rounded-lg">
                            Últimos 20 min
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={internal_externalConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillInterna" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-temperaturaInterna)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-temperaturaInterna)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillExterna" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-temperaturaExterna)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-temperaturaExterna)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleTimeString("pt", { hour: "2-digit", minute: "2-digit" })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("pt", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="temperaturaExterna"
                            name={internal_externalConfig.temperaturaExterna.label}
                            type="natural"
                            fill="url(#fillExterna)"
                            stroke={internal_externalConfig.temperaturaExterna.color}
                            stackId="a"
                        />
                        <Area
                            dataKey="temperaturaInterna"
                            name={internal_externalConfig.temperaturaInterna.label}
                            type="natural"
                            fill="url(#fillInterna)"
                            stroke={internal_externalConfig.temperaturaInterna.color}
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}