const fetcher = async(url:string, data = undefined, token: string) => {
    return fetch(`http://localhost:8888/${url}`,{
        method: data ? 'PATCH' || 'PUT': 'GET' || 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
    }).then((res) => res.json())
}

export default fetcher;
