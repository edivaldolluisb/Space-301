import { useState, useEffect } from 'react';
import { api } from '../../../lib/axios';
import { Rocket, Launch } from '../types';

export const useLaunchInfo = (launchId: string) => {
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [rocket, setRocket] = useState<Rocket | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLaunchAndRocketData = async () => {
      if (!launchId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
         
        const launchResponse = await api.get(`/launches/${launchId}`);
        setLaunch(launchResponse.data);

        
        const rocketResponse = await api.get(`/launches/${launchId}/rocket`);
        setRocket(rocketResponse.data);
      } catch (fetchError) {
        setError('Erro ao buscar informações de lançamento');
        console.error('Erro de busca:', fetchError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLaunchAndRocketData();
  }, [launchId]);

  return { 
    launch, 
    rocket, 
    isLoading, 
    error 
  };
};