import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_INGREDIENTS_ITEM,
    DECREASE_INGREDIENTS_ITEM,
    RESET_INGREDIENTS_COUNT,
    TIngredientsActions,
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

export const initialState: TIngredientsState = {
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
        case RESET_INGREDIENTS_COUNT: {
            return {
                ...state,
                burgerIngredients: {
                    ...state.burgerIngredients,
                    bun: {...state.burgerIngredients.bun, qty: 0 },
                    ingredients: state.burgerIngredients.ingredients.map(item => {
                        return { ...item, qty: 0 };
                    })
                }
            };
        }
        default: {
            return state
        }
    }
}