import type { ThunkDispatch } from 'redux-thunk';
import store from '../store';
import { TAuthorizationActions } from "../actions/authorization";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { TIngredientsActions } from "../actions/burger-ingredients";
import { TOrderDetailsActions } from "../actions/order-details";
import { TWSActions } from '../actions/web-socket';
import {
    wsCloseAction,
    wsConnectAction,
    wsConnectingAction,
    wsDisconnectAction,
    wsErrorAction,
    wsMessageAction,
    wsOpenAction
} from "../thunk/web-socket";

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
    wsConnect: typeof wsConnectAction,
    wsDisconnect: typeof wsDisconnectAction,
    wsConnecting: typeof wsConnectingAction,
    wsOpen: typeof wsOpenAction,
    wsClose: typeof wsCloseAction,
    wsError: typeof  wsErrorAction,
    wsMessage: typeof  wsMessageAction,
};