const localStorageKey = 'token';

export default async function client(endpoint, config) {
    const token = window.localStorage.getItem(localStorageKey);
    const headers = { 'Content-Type': 'application/json' };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        method: body ? 'POST' : 'GET',
        ...config,
        headers: {
            ...headers,
            ...config.headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await window.fetch(`${process.env.API_URL}/${endpoint}`, config);

    if (response.status === 401) {
        logout();
        window.location.assign(window.location);
        return;
    }

    const data = await response.json();

    if (response.ok) {
        return data;
    }
    else {
        return Promise.reject(data);
    }
}

function logout() {
    window.localStorage.removeItem(localStorageKey);
}