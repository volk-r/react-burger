import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS
} from '../actions/burger-ingredients';

const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    burgerIngredients: { bun: {}, ingredients: [] },
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                burgerIngredients: action.ingredients,
                ingredientsRequest: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false
            };
        }
        default: {
            return state
        }
    }
}