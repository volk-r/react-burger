import {
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED,
} from "../actions/order-details";

const initialState = {
    orderNumber: null,
    // todo: failed request
}

export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
            };
        }
        case GET_ORDER_NUMBER_FAILED: {
            return initialState;
        }
        default: {
            return state
        }
    }
}