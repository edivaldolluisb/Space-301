import {
    Flame,
    Thermometer,
    Wind,
    Leaf,
    MapPin,
    Gauge,
    Fuel,
    Signal,
    BatteryCharging,
    LucideIcon,
  } from 'lucide-react';

export const iconMappings: { [key: string]: LucideIcon } = {
    altitude: MapPin,
    velocidade: Gauge,
    velocidade_x: Gauge,
    aceleracao: Flame,
    forca_g: Leaf,
    pressao_atual: Thermometer,
    temperatura_atual: Thermometer,
    temperatura_motor_atual: Thermometer,
    temperatura_externa_atual: Wind,
    combustivel: Fuel,
    qualidade_atual: Signal,
    oxigenio_atual: Leaf,
    energia_atual: BatteryCharging,
  };