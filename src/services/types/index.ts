import type { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from "redux";
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

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;