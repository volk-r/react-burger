import { getIngredients } from '../../utils/burger-api';
import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_INGREDIENTS_ITEM,
    DECREASE_INGREDIENTS_ITEM,
} from "../actions/burger-ingredients";
import { BUN_TYPE } from "../../utils/constants";

export function getIngredientsList() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS
        })

        getIngredients().then( data  => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: { bun: data.filter((item) => item.type === BUN_TYPE).pop(), ingredients: data }
            })
        }).catch( err => {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        })
    }
}

export const increaseIngrideintsCount = (item) => ({
    type: INCREASE_INGREDIENTS_ITEM,
    item
});

export const decreaseIngrideintsCount = (item) => ({
    type: DECREASE_INGREDIENTS_ITEM,
    item
});