import {makeOrder, refreshTokenRequest, saveTokens} from '../../utils/burger-api';
import {
    GET_ORDER_NUMBER,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED,
    RESET_ORDER_NUMBER,
} from "../actions/order-details";

export function getOrderNumber(ids) {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_NUMBER,
            isLoading: true,
            hasError: false,
        })

        makeOrder(ids).then( data  => {
            dispatch({
                type: GET_ORDER_NUMBER_SUCCESS,
                orderNumber: data,
                isLoading: false,
                hasError: false,
            })
        }).catch( err => {
            if (err.message === 'jwt expired') {
                dispatch(refreshToken(makeOrder(ids)));
            } else {
                dispatch({
                    type: GET_ORDER_NUMBER_FAILED,
                    orderNumber: null,
                    isLoading: false,
                    hasError: true,
                })
            }
        })
    }
}

export function resetOrderNumber() {
    return function(dispatch) {
        dispatch({
            type: RESET_ORDER_NUMBER,
        })
    }
}

const refreshToken = (afterRefresh) => (dispatch) => {
    refreshTokenRequest()
    .then((res) => {
        saveTokens(res.refreshToken, res.accessToken);
        dispatch(afterRefresh);
    })
};