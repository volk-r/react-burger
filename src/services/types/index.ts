import type { ThunkDispatch } from 'redux-thunk';
import store from '../store';
import { TAuthorizationActions } from "../actions/authorization";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { TIngredientsActions } from "../actions/burger-ingredients";
import { TOrderDetailsActions } from "../actions/order-details";
import {
    WS_CONNECT,
    WS_CONNECTING,
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_DISCONNECT,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_OPEN,
    WS_GET_MESSAGE,
    TWSActions,
} from '../actions/web-socket';

export type TApplicationActions =
    TAuthorizationActions
    | TBurgerConstructorActions
    | TIngredientsActions
    | TOrderDetailsActions
    | TWSActions
;

export type RootState = ReturnType<typeof store.getState>;
// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>

export type TWSStoreActions = {
    wsConnect: typeof WS_CONNECT,
    wsDisconnect: typeof WS_CONNECTION_DISCONNECT,
    wsConnecting: typeof WS_CONNECTING,
    wsOpen: typeof WS_CONNECTION_OPEN,
    wsClose: typeof WS_CONNECTION_CLOSE,
    wsError: typeof  WS_CONNECTION_ERROR,
    wsMessage: typeof  WS_GET_MESSAGE,
};