import { RootState } from "../types";
import { TIngredient } from "../../utils/types";
import { IFormValues } from "../../utils/interfaces";
import { TOrderDetailsSate } from "../reducers/order-details";
import { TBurgerConstructorState } from "../reducers/burger-constructor";

export const ingredientsSelector = (store: RootState): TIngredient[] => store.ingredients.burgerIngredients.ingredients
export const isLoadingIngredientsSelector = (store: RootState): boolean => store.ingredients.ingredientsRequest
export const hasErrorIngredientsSelector = (store: RootState): boolean => store.ingredients.ingredientsFailed

export const burgerConstructorIngredientsSelector = (store: RootState): TBurgerConstructorState => store.constructorIngredients
export const orderSelector = (store: RootState): TOrderDetailsSate => store.order
export const userInfoSelector = (store: RootState): IFormValues | null => store.authData.user
export const authDataErrorSelector = (store: RootState): string | null => store.authData.message
export const authDataRequestSelector = (store: RootState): boolean => store.authData.request
export const resetPasswordEmailSelector = (store: RootState): string | null => store.authData.resetPasswordEmail
