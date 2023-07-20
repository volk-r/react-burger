import {
    WS_CONNECT,
    WS_CONNECTING,
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_DISCONNECT,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_OPEN,
    WS_GET_MESSAGE,
} from '../actions/web-socket';
import { TWSSocketData } from "../../utils/types";

export const wsConnectAction = (url: string) => ({
    type: WS_CONNECT,
    payload: {
        url: url,
    }
});

export const wsDisconnectAction = () => ({
    type: WS_CONNECTION_DISCONNECT,
});

export const wsConnectingAction = () => ({
    type: WS_CONNECTING,
});

export const wsOpenAction = () => ({
    type: WS_CONNECTION_OPEN,
});

export const wsCloseAction = () => ({
    type: WS_CONNECTION_CLOSE,
});

export const wsMessageAction = (messages: TWSSocketData) => ({
    type: WS_GET_MESSAGE,
    payload: {
        messages
    }
});

export const wsErrorAction = (connectionError: string) => ({
    type: WS_CONNECTION_ERROR,
    payload: {
        connectionError
    }
});