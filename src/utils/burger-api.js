const API_URL = 'https://norma.nomoreparties.space/api';

async function fetchData(path) {
    const getErrorMessage = (error) => {
        if (error instanceof Error) {
            return error.message;
        }
        return String(error);
    };

    try {
        let response = await fetch(`${API_URL}/${path}`);

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