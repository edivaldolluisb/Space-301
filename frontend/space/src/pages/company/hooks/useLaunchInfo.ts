import { useState, useEffect } from 'react';
import { api, auth } from "@/lib/axios";
import { Rocket, Launch } from '../types';

export const useLaunchInfo = (launchId: string) => {
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [rocket, setRocket] = useState<Rocket | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { authenticated } = auth.isAuthenticated();

  useEffect(() => {
    const fetchLaunchAndRocketData = async () => {
      if (!launchId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const endpoint = authenticated
          ? `/launches/${launchId}`
          : `/visitor/launches/${launchId}`;

          const rocketendpoint = authenticated
          ? `/launches/${launchId}/rocket`
          : `/visitor/launches/${launchId}/rocket`;

        const launchResponse = await api.get(endpoint);
        setLaunch(launchResponse.data);


        const rocketResponse = await api.get(rocketendpoint);
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