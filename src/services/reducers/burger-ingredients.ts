import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_INGREDIENTS_ITEM,
    DECREASE_INGREDIENTS_ITEM, TIngredientsActions,
} from '../actions/burger-ingredients';
import { BUN_TYPE } from "../../utils/constants";
import { TIngredient } from "../../utils/types";

type TIngredientsState = {
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
    burgerIngredients: {
        bun: TIngredient | {},
        ingredients: Array<TIngredient>
    },
}

const initialState: TIngredientsState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    burgerIngredients: { bun: {}, ingredients: [] },
}

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
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
                burgerIngredients: action.payload.burgerIngredients,
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

            if (action.payload.item.type === BUN_TYPE) {
                ingredients = ingredients.map(item =>
                    item.type === BUN_TYPE ? { ...item, qty: item.qty ? --item.qty : 0 } : item
                )
            }

            ingredients = ingredients.map(item =>
                item._id === action.payload.item._id ? { ...item, qty: item.qty ? ++item.qty : 1 } : item
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
                        item._id === action.payload.item._id ? { ...item, qty: item.qty ? --item.qty : 0 } : item
                    )
                }
            };
        }
        default: {
            return state
        }
    }
}