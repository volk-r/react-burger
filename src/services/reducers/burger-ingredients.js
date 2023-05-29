import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_INGREDIENTS_ITEM,
    DECREASE_INGREDIENTS_ITEM,
} from '../actions/burger-ingredients';
import { BUN_TYPE } from "../../utils/constants";

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
        case INCREASE_INGREDIENTS_ITEM: {
            let ingredients = state.burgerIngredients.ingredients;

            if (action.item.type === BUN_TYPE) {
                ingredients = ingredients.map(item =>
                    item.type === BUN_TYPE ? { ...item, qty: item.qty ? --item.qty : 0 } : item
                )
            }

            ingredients = ingredients.map(item =>
                item._id === action.item._id ? { ...item, qty: item.qty ? ++item.qty : 1 } : item
            )

            return {
                ...state,
                burgerIngredients: {
                    ...state.burgerIngredients,
                    ingredients: ingredients
                }
            };
        }
        case DECREASE_INGREDIENTS_ITEM: {
            return {
                ...state,
                burgerIngredients: {
                    ...state.burgerIngredients,
                    ingredients: state.burgerIngredients.ingredients.map(item =>
                        item._id === action.item._id ? { ...item, qty: item.qty ? --item.qty : 0 } : item
                    )
                }
            };
        }
        default: {
            return state
        }
    }
}