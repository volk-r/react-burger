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
        })

        makeOrder(ids).then( data  => {
            dispatch({
                type: GET_ORDER_NUMBER_SUCCESS,
                payload: {
                    orderNumber: data,
                }
            })
        }).catch( err => {
            if (err.message === 'jwt expired') {
                dispatch(refreshToken(makeOrder(ids)));
            } else {
                dispatch({
                    type: GET_ORDER_NUMBER_FAILED,
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