import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import {fetcher} from './fetcher';



export const useVehicles = (token: string) => {
  const { data, error, mutate } = useSWR(['api/vehicle/all', {method: 'GET', token}],
    ([url, argv]) => fetcher(url,argv)
  );

  
  return {
    vehicles: (data?.vehicles as any) || [],
    isLoading: !data && !error,
    isError: error, 
    mutate
  };
};

export const useRecords = (token: string) => {
  const { data, error, mutate } = useSWR(
    ['api/vehicles/logs', { method: 'GET', token }],
    ([url, argv]) => fetcher(url, argv)
  );


  return {
    logs: (data?.logs as any) || [],
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};

export const useCRUDVehicle = (url: string) => {

  const { trigger, isMutating, data } = useSWRMutation(
    url,
    fetcher
  );

  return {
    trigger,
    isMutating,
    data
  }

}

