import { makeOrder } from '../../utils/burger-api';
import {
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED,
} from "../actions/order-details";

export function getOrderNumber(ids) {
    return function(dispatch) {
        makeOrder(ids).then( data  => {
            dispatch({
                type: GET_ORDER_NUMBER_SUCCESS,
                orderNumber: data,
                hasError: false,
            })
        }).catch( err => {
            dispatch({
                type: GET_ORDER_NUMBER_FAILED,
                orderNumber: null,
                hasError: true,
            })
        })
    }
}