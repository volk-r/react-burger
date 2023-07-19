import { TSocketData } from "../../utils/types";

export const WS_CONNECTING: "WS_CONNECTING" = "WS_CONNECTING";
export const WS_CONNECT: "WS_CONNECT" = "WS_CONNECT";
export const WS_CONNECTION_DISCONNECT: "WS_CONNECTION_DISCONNECT" = "WS_CONNECTION_DISCONNECT";
export const WS_CONNECTION_OPEN: "WS_CONNECTION_OPEN" = "WS_CONNECTION_OPEN";
export const WS_CONNECTION_CLOSE: "WS_CONNECTION_CLOSE" = "WS_CONNECTION_CLOSE";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";

export interface IWSConnectAction {
    readonly type: typeof WS_CONNECT;
    readonly payload: {
        readonly url: string,
    };
}

export interface IWSConnectionDisconnectAction {
    readonly type: typeof WS_CONNECTION_DISCONNECT;
}

export interface IWSConnectingAction {
    readonly type: typeof WS_CONNECTING;
}

export interface IWSConnectionOpenAction {
    readonly type: typeof WS_CONNECTION_OPEN;
}

export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: {
        readonly connectionError: string,
    };
}

export interface IWSConnectionCloseAction {
    readonly type: typeof WS_CONNECTION_CLOSE;
}

export interface IWSGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: {
        readonly messages: TSocketData,
    };
}

export type TWSActions =
    IWSConnectAction
    | IWSConnectionDisconnectAction
    | IWSConnectingAction
    | IWSConnectionOpenAction
    | IWSConnectionErrorAction
    | IWSConnectionCloseAction
    | IWSGetMessageAction
;