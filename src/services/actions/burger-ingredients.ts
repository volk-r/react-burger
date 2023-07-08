import { TIngredient } from "../../utils/types";

export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const INCREASE_INGREDIENTS_ITEM: 'INCREASE_INGREDIENTS_ITEM' = 'INCREASE_INGREDIENTS_ITEM';
export const DECREASE_INGREDIENTS_ITEM: 'DECREASE_INGREDIENTS_ITEM' = 'DECREASE_INGREDIENTS_ITEM';

export interface IGetIngredientsAction {
    readonly type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: {
        readonly burgerIngredients: {
            readonly bun: TIngredient,
            readonly ingredients: Array<TIngredient>
        },
    };
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IIncreaseIngredientsAction {
    readonly type: typeof INCREASE_INGREDIENTS_ITEM;
    readonly payload: {
        readonly item: TIngredient,
    };
}

export interface IDecreaseIngredientsAction {
    readonly type: typeof DECREASE_INGREDIENTS_ITEM;
    readonly payload: {
        readonly item: TIngredient,
    };
}

export type TIngredientsActions =
    | IGetIngredientsAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction
    | IIncreaseIngredientsAction
    | IDecreaseIngredientsAction
;