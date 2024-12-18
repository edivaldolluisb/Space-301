import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { WebSocketData } from '@/components/types';

export const useRocketData = (launchId: string) => {
  const [rocketData, setRocketData] = useState<WebSocketData | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!launchId) return;

    const client = new Client({
      brokerURL: `${import.meta.env.VITE_BROKER_URL}`,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log(`Conectado ao WebSocket: /topic/${launchId}/launch-data`);
        console.log(`connected: ${isConnected}`);
        setIsConnected(true);
        
        const subscription = client.subscribe(
          `/topic/${launchId}/launch-data`, 
          (msg) => {
            try {
              const data: WebSocketData = JSON.parse(msg.body);
              setRocketData(data);
            } catch (parseError) {
              setError('Erro ao processar dados do WebSocket');
              console.error('Erro ao processar a mensagem do WebSocket:', parseError);
            }
          }
        );

        // Retorna função de limpeza
        return () => {
          subscription.unsubscribe();
        };
      },
      onDisconnect: () => {
        console.log('Desconectado do WebSocket');
        setIsConnected(false);
      },
      onStompError: (frame) => {
        setError(`Erro no WebSocket: ${frame.headers['message']}`);
        console.error('Erro no WebSocket:', frame);
      }
    });

    try {
      client.activate();
    } catch (activationError) {
      setError('Erro ao ativar conexão WebSocket');
      console.error('Erro de ativação:', activationError);
    }

    // Função de limpeza
    return () => {
      client.deactivate();
    };
  }, [launchId]);

  return { 
    rocketData, 
    // isConnected, 
    error 
  };
};