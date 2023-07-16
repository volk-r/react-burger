import { setCookie, getCookie, deleteCookie } from './utils';
import { IFormValues } from "./interfaces"

const API_URL = 'https://norma.nomoreparties.space/api';

export const SOCKET_URL_ORDERS_ALL = 'wss://norma.nomoreparties.space/orders/all'
export const SOCKET_URL_USER_ORDERS = 'wss://norma.nomoreparties.space/orders'

const request = (endpoint: string, options?: RequestInit): Promise<any> => {
    return fetch(`${API_URL}/${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
};

const checkResponse = (response: Response): Promise<any> => {
    return response.ok
        ? response.json()
        : response.json().then((err: Error) => {
            return Promise.reject(err);
        });
};

const checkSuccess = (response: {success?: boolean}): any => {
    if (response && response.success) {
        return response;
    }

    console.log(`[fetchData failed]: ${response}`)
    return Promise.reject(`[fetchData failed]: ${response}`);
};

export async function getIngredients(): Promise<any> {
    const data = await request('ingredients');

    return data.data;
}

export async function makeOrder(ingredientIDs: string[]): Promise<number> {
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
        return Promise.reject("accessToken not found");
    }

    const parameters: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': accessToken,
        },
        body: JSON.stringify({
            "ingredients": ingredientIDs
        })
    };
    const data = await request('orders', parameters);

    return data.order.number;
}

export async function restorePassword(email: string): Promise<string> {
    const parameters: RequestInit = {
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

export async function resetPassword(form: IFormValues): Promise<string> {
    const parameters: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    };
    const data = await request('password-reset/reset', parameters);

    return data.message;
}

export async function registerAccount(form: IFormValues): Promise<any> {
    const parameters: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    };
    const data = await request('auth/register', parameters);

    return data;
}

export async function accountAuthorization(form: IFormValues): Promise<any> {
    const parameters: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    };
    const data = await request('auth/login', parameters);

    return data;
}

export const saveTokens = (refreshToken: string, accessToken: string) => {
    setCookie('accessToken', accessToken, {path: "/profile"});
    localStorage.setItem('refreshToken', refreshToken);
}

export async function refreshTokenRequest(): Promise<any> {
    const parameters: RequestInit = {
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

export async function userData(newUseData?: IFormValues): Promise<any> {
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
        return Promise.reject("accessToken not found");
    }

    const parameters: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': accessToken,
        },
    };

    if (newUseData) {
        parameters.method = 'PATCH';
        parameters.body = JSON.stringify(newUseData);
    }

    const data = await request('auth/user', parameters);

    return data;
}

export async function closeSession(): Promise<any> {
    const parameters: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "token": localStorage.getItem('refreshToken')
        })
    };
    const data = await request('auth/logout', parameters);

    return data;
}

export const cleanupTokenData = () => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
}