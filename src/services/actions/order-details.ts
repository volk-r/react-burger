import { ITestAction } from "./test";

export const GET_ORDER_NUMBER: 'GET_ORDER_NUMBER' = 'GET_ORDER_NUMBER';
export const GET_ORDER_NUMBER_SUCCESS: 'GET_ORDER_NUMBER_SUCCESS' = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED: 'GET_ORDER_NUMBER_FAILED' = 'GET_ORDER_NUMBER_FAILED';
export const RESET_ORDER_NUMBER: 'RESET_ORDER_NUMBER' = 'RESET_ORDER_NUMBER';

export interface IGetOrderNumberAction {
    readonly type: typeof GET_ORDER_NUMBER;
}

export interface IGetOrderNumberSuccessAction {
    readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
    readonly payload: {
        readonly orderNumber: number | null,
    };
}

export interface IGetOrderNumberFailedAction {
    readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export interface IResetOrderNumberAction {
    readonly type: typeof RESET_ORDER_NUMBER;
}

export type TOrderDetailsActions =
    IGetOrderNumberAction
    | IGetOrderNumberSuccessAction
    | IGetOrderNumberFailedAction
    | IResetOrderNumberAction
    | ITestAction
;