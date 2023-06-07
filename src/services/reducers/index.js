import { combineReducers } from 'redux';
import { ingredientsReducer } from "./burger-ingredients";
import { burgerConstructorReducer } from "./burger-constructor";
import { orderDetailsReducer } from "./order-details";
import { authorizationReducer } from "./authorization";

export const rootReducer = combineReducers({
    ingredients           : ingredientsReducer,
    constructorIngredients: burgerConstructorReducer,
    order                 : orderDetailsReducer,
    authData              : authorizationReducer,
});