import {
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED,
} from "../actions/order-details";

const initialState = {
    orderNumber: null,
    hasError: false,
}

export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                hasError: false,
            };
        }
        case GET_ORDER_NUMBER_FAILED: {
            return {
                ...state,
                orderNumber: null,
                hasError: true,
            }
        }
        default: {
            return state
        }
    }
}