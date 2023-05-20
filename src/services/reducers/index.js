import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    ingredients: () => [],
    constructorIngredients: () => [],
    currentIngredient: () => null,
    order: () => null,
});