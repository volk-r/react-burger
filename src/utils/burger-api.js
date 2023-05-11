const API_URL = 'https://norma.nomoreparties.space/api';

async function fetchData(path, parameters = {}) {
    const getErrorMessage = (error) => {
        if (error instanceof Error) {
            return error.message;
        }
        return String(error);
    };

    try {
        let response = await fetch(`${API_URL}/${path}`, parameters);

        if (response.ok) {
            const jsonData = await response.json();
            return jsonData;
        }

        throw "something went wrong, mailformed json, status: " + response.status;
    }
    catch (e) {
        throw "[fetchData failed]: " + getErrorMessage(e);
    }
}

export async function getIngredients() {
    const data = await fetchData('ingredients');

    if (
        data
        && typeof data.success !== "undefined"
        && data.success === true
    ) {
        return data.data;
    }

    throw "[getIngredients]: data not found";
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
    const data = await fetchData('orders', parameters);

    if (
        data
        && typeof data.success !== "undefined"
        && data.success === true
    ) {
        return data.order.number;
    }

    throw "[makeOrder]: data not found";
}