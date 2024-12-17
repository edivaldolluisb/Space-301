
export const statusMappings = (parameter: string, value: number): string => {
    const ranges: { [key: string]: { min: number; max: number } } = {
      altitude: { min: 0, max: 100000 },
      velocidade: { min: -666.67, max: 666.67 },
      velocidade_x: { min: 0, max: 300 },
      aceleracao: { min: -2.22, max: 2.22 },
      forca_g: { min: -0.226, max: 0.226 },
      pressao_atual: { min: 500, max: 101325 },
      temperatura_atual: { min: 200, max: 288.15 },
      temperatura_motor_atual: { min: 303.15, max: 600 },
      temperatura_externa_atual: { min: 3, max: 288.15 },
      combustivel: { min: 0, max: 2000000 },
      qualidade_atual: { min: 80, max: 100 },
      oxigenio_atual: { min: 18, max: 21 },
      energia_atual: { min: 100, max: 50000 },
    };
  
    const range = ranges[parameter];
  
    if (!range) {
      return 'Irregular';
    }
  
    return value >= range.min && value <= range.max ? 'Normal' : 'Irregular';
  };
  