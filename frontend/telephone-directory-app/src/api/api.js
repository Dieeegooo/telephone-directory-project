const BASE_URL = import.meta.env.VITE_API_URL;


export const apiRequest = async (url, method, data = null) => {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const options = {
        method: method,
        headers: headers,
    };

    if (data && method !== 'GET') {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(BASE_URL + url, options);

    if (!response.ok) {
        let errorData = null;
        try {
            errorData = await response.json();
        } catch (e) {
            // corpo assente o non JSON
        }
        const error = new Error(errorData?.message || `Errore HTTP: ${response.status}`);
        error.status = response.status;
        error.data = errorData;
        throw error;
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
};