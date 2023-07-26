import {
    WS_CONNECTING,
    WS_CONNECTION_OPEN,
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE,
    TWSActions
} from '../actions/web-socket';
import { TOrder, WebsocketStatus } from "../../utils/types";

export type TWSState = {
    status: WebsocketStatus;
    orders: TOrder[],
    total: number,
    totalToday: number,
    connectionError: string | null
}

export const initialState: TWSState = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    total: 0,
    totalToday: 0,
    connectionError: null,
};

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
    switch (action.type) {
        case WS_CONNECTING:
            return {
                ...state,
                connectionError: null,
                status: WebsocketStatus.CONNECTING,
            };

        case WS_CONNECTION_OPEN:
            return {
                ...state,
                connectionError: null,
                status: WebsocketStatus.ONLINE,
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                connectionError: action.payload.connectionError,
            };
        case WS_CONNECTION_CLOSE:
            return {
                ...state,
                connectionError: null,
                status: WebsocketStatus.OFFLINE,
            };
        case WS_GET_MESSAGE:
            const data = action.payload.messages

            if (data.success) {
                return {
                    ...state,
                    connectionError: null,
                    orders: data.orders!.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
                    total: data.total!,
                    totalToday: data.totalToday!,
                };
            } else {
                return {
                    ...state,
                    connectionError: data.message!
                }
            }

        default:
            return state;
    }
};