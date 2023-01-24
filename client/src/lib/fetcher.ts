


export const fetcher = async (
  url: string,
  argv: any
) => {
  return fetch(
    argv?.id
      ? `${import.meta.env.VITE_REACT_API_URI}${url}/${argv?.id}`
      : `${import.meta.env.VITE_REACT_API_URI}${url}`,
    {
    method: argv?.method,
    headers: {
      Authorization: `Bearer ${argv?.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(argv?.data),
  }).then((res) => res.json());
};

export async function sendRequest(url: any, { arg }: any) {
  return fetch(
    arg.id
      ? `${import.meta.env.VITE_REACT_API_URI}${url}/${arg.id}`
      : `${import.meta.env.VITE_REACT_API_URI}${url}`,
    {
      method: arg.method,
      headers: {
        Authorization: `Bearer ${arg.token}`,
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.json());
}

export async function sendRequestWithData(url: any, { arg }: any) {
  return fetch(
    arg.id
      ? `${import.meta.env.VITE_REACT_API_URI}${url}/${arg.id}`
      : `${import.meta.env.VITE_REACT_API_URI}${url}`,
    {
      method: arg.method,
      headers: {
        Authorization: `Bearer ${arg.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg.data),
    }
  ).then((res) => res.json());
}
