const API_URL = 'https://norma.nomoreparties.space/api';

const request = (endpoint, options) => {
    return fetch(`${API_URL}/${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
};

const checkResponse = (response) => {
    if (response.ok) {
        const jsonData = response.json();
        console.log(jsonData);
        return jsonData;
    }

    console.log(`something went wrong, mailformed json, status ${response.status}`)
    return Promise.reject(`something went wrong, mailformed json, status ${response.status}`);
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

export async function resetPassword(form) {
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

export async function refreshToken(token) {
    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "token": token
        })
    };
    const data = await request('auth/token', parameters);

    return data;
}

export async function userData(token) {
    const parameters = {
        method: 'GET', // 'PATCH'
        headers: {
            'Content-Type': 'application/json',
            'authorization': token,
        },
    };
    const data = await request('auth/user', parameters);

    return data;
}