import { setCookie, getCookie, deleteCookie } from './utils';

const API_URL = 'https://norma.nomoreparties.space/api';

const request = (endpoint, options) => {
    return fetch(`${API_URL}/${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
};

const checkResponse = (response) => {
    return response.ok
        ? response.json()
        : response.json().then((err) => {
            return Promise.reject(err);
        });
};

const checkSuccess = (response) => {
    if (response && response.success) {
        return response;
    }

    console.log(`[fetchData failed]: ${response}`)
    return Promise.reject(`[fetchData failed]: ${response}`);
};

export async function getIngredients() {
    const data = await request('ingredients');

    return data.data;
}

export async function makeOrder(ingredientIDs) {
    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ingredients": ingredientIDs
        })
    };
    const data = await request('orders', parameters);

    return data.order.number;
}

export async function restorePassword(email) {
    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
        })
    };
    const data = await request('password-reset', parameters);

    return data.message;
}

export async function resetPassword(form) {//todo
    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    };
    const data = await request('password-reset/reset', parameters);

    return data.message;
}

export async function registerAccount(form) {
    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    };
    const data = await request('auth/register', parameters);

    return data;
}

export async function accountAuthorization(form) {
    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    };
    const data = await request('auth/login', parameters);

    return data;
}

export const saveTokens = (refreshToken, accessToken) => {
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

export async function refreshTokenRequest() {
    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "token": localStorage.getItem('refreshToken')
        })
    };
    const data = await request('auth/token', parameters);

    return data;
}

export async function userData(newUseData) {
    const parameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': getCookie('accessToken'),
        },
    };

    if (newUseData) {
        parameters.method = 'PATCH';
        parameters.body = JSON.stringify(newUseData);
    }

    const data = await request('auth/user', parameters);

    return data;
}

export const cleanupTokenData = () => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
}