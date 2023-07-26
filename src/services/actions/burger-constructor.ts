import { TConstructorIngredient } from "../../utils/types";
import { ITestAction } from "./test";

export const ADD_INGREDIENT_TO_CONSTRUCTOR: 'ADD_INGREDIENT_TO_CONSTRUCTOR' = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR: 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR' = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const UPDATE_INGREDIENT_POSITION: 'UPDATE_INGREDIENT_POSITION' = 'UPDATE_INGREDIENT_POSITION';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

export interface IBurgerConstructorAddAction {
    readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
    readonly payload: {
        readonly item: TConstructorIngredient,
    };
}

export interface IBurgerConstructorRemoveAction {
    readonly type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
    readonly payload: {
        readonly item: TConstructorIngredient,
    };
}

export interface IBurgerConstructorUpdateAction {
    readonly type: typeof UPDATE_INGREDIENT_POSITION;
    readonly payload: {
        readonly dragIndex: number,
        readonly hoverIndex: number,
    };
}

export interface IClearBurgerConstructorAction {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TBurgerConstructorActions =
    IBurgerConstructorAddAction
    | IBurgerConstructorRemoveAction
    | IBurgerConstructorUpdateAction
    | IClearBurgerConstructorAction
    | ITestAction
;