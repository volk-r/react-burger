import {
    orderDetailsReducer,
    initialState
} from "./order-details";
import {
    GET_ORDER_NUMBER,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED,
    RESET_ORDER_NUMBER,
    TOrderDetailsActions,
} from "../actions/order-details";

describe("order details reducer", () => {
    it("should return the initial state", () => {
        expect(orderDetailsReducer(undefined, {} as  TOrderDetailsActions)).toEqual(initialState);
    });

    it("should reset state", () => {
        expect(orderDetailsReducer(initialState, { type: RESET_ORDER_NUMBER })).toEqual(initialState);
    });

    it("should start order process", () => {
        expect(orderDetailsReducer(initialState, { type: GET_ORDER_NUMBER })).toEqual({
            ...initialState,
            isLoading: true
        });
    });

    it("should handle order success", () => {
        const orderNumber = 12345;
        const action = {
            type: GET_ORDER_NUMBER_SUCCESS,
            payload: {
                orderNumber: orderNumber
            },
        };
        expect(orderDetailsReducer(initialState, action)).toEqual({
            ...initialState,
            orderNumber: orderNumber,
        });
    });

    it("should handle order failed", () => {
        const action = {
            type: GET_ORDER_NUMBER_FAILED
        };
        expect(orderDetailsReducer(initialState, action)).toEqual({
            ...initialState,
            hasError: true,
        });
    });
});