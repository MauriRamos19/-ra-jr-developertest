import useSWR, { useSWRConfig } from 'swr';
import fetcher from './fetcher';



export const useVehicles = (token: string) => {
  const { data, error } = useSWR(['api/vehicle/all', token], ([url, token]) =>
    fetcher(url, undefined, token)
  );


  return {
    vehicles: (data?.vehicles as any) || [],
    isLoading: !data && !error,
    isError: error,
  };
};

// export const useRegisterEntry= (sendData: any, token: string) => {
//   const { mutate } = useSWRConfig();

//   return {
//     data: data?.msg,
//     mutate
//   };
// };

// export const useRegisterExit = (sendData: any, token: string) => {
//   const { mutate } = useSWRConfig();

//   return {
//     data: data?.msg,
//     mutate
//   };
// };

// export const useUser = (user = undefined) => {
//       const { trigger } = useSWRMutation('login', fetcher.sendRequest);
        
//       return {
//         user: data,
//         isLoading: !data && !error,
//         isError: error,
//       };

// }