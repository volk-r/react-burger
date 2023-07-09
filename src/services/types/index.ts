import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import store from '../store';
import { TAuthorizationActions } from "../actions/authorization";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { TIngredientsActions } from "../actions/burger-ingredients";
import { TOrderDetailsActions } from "../actions/order-details";

export type TApplicationActions =
    TAuthorizationActions
    | TBurgerConstructorActions
    | TIngredientsActions
    | TOrderDetailsActions
;

export type RootState = ReturnType<typeof store.getState>;
// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>