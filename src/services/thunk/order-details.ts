import {makeOrder, refreshTokenRequest, saveTokens} from '../../utils/burger-api';
import {
    GET_ORDER_NUMBER,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED,
    RESET_ORDER_NUMBER,
} from "../actions/order-details";
import { AppDispatch } from "../types";
import { CLEAR_CONSTRUCTOR } from "../actions/burger-constructor";
import { RESET_INGREDIENTS_COUNT } from "../actions/burger-ingredients";

export function getOrderNumber(ids: string[]) {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_NUMBER,
        })

        refreshTokenRequest().then((res) => {
            saveTokens(res.refreshToken, res.accessToken);

            makeOrder(ids).then( data  => {
                dispatch({
                    type: GET_ORDER_NUMBER_SUCCESS,
                    payload: {
                        orderNumber: data,
                    }
                })
                dispatch({
                    type: CLEAR_CONSTRUCTOR,
                })
                dispatch({
                    type: RESET_INGREDIENTS_COUNT,
                })
            }).catch( err => {
                dispatch({
                    type: GET_ORDER_NUMBER_FAILED,
                })
            })
        })
    }
}

export function resetOrderNumber() {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: RESET_ORDER_NUMBER,
        })
    }
}