import { RootState } from "../types";
import { TIngredient } from "../../utils/types";
import { IFormValues } from "../../utils/interfaces";
import { TOrderDetailsSate } from "../reducers/order-details";
import { TBurgerConstructorState } from "../reducers/burger-constructor";
import { TWSState } from "../reducers/web-socket";

export const ingredientsSelector = (store: RootState): TIngredient[] => store.ingredients.burgerIngredients.ingredients
export const isLoadingIngredientsSelector = (store: RootState): boolean => store.ingredients.ingredientsRequest
export const hasErrorIngredientsSelector = (store: RootState): boolean => store.ingredients.ingredientsFailed

export const burgerConstructorIngredientsSelector = (store: RootState): TBurgerConstructorState => store.constructorIngredients
export const orderSelector = (store: RootState): TOrderDetailsSate => store.order
export const userInfoSelector = (store: RootState): IFormValues | null => store.authData.user
export const authDataErrorSelector = (store: RootState): string | null => store.authData.message
export const authDataRequestSelector = (store: RootState): boolean => store.authData.request
export const resetPasswordEmailSelector = (store: RootState): string | null => store.authData.resetPasswordEmail

export const feedSelector = (state: RootState): TWSState => state.ws

type TIngredientsMap = {
    [key: string]: Pick<TIngredient, 'name' | 'image_mobile' | 'price'>
}
export const getIngredientsMap = (state: RootState) => {
    const ingredientsList = ingredientsSelector(state);
    const ingredientsMap: TIngredientsMap = {};

    ingredientsList.forEach((item) => {
        ingredientsMap[item._id] = {
            name: item.name,
            image_mobile: item.image_mobile,
            price: item.price,
        };
    });

    return ingredientsMap;
};
