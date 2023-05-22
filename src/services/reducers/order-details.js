import {
    GET_ORDER_NUMBER,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED,
    RESET_ORDER_NUMBER,
} from "../actions/order-details";

const initialState = {
    orderNumber: null,
    isLoading: false,
    hasError: false,
}

export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_NUMBER: {
            return {
                ...state,
                isLoading: true,
                hasError: false,
            };
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                isLoading: false,
                hasError: false,
            };
        }
        case GET_ORDER_NUMBER_FAILED: {
            return {
                ...state,
                orderNumber: null,
                isLoading: false,
                hasError: true,
            }
        }
        case RESET_ORDER_NUMBER: {
            return initialState
        }
        default: {
            return state
        }
    }
}