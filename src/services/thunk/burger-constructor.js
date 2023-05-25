import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    UPDATE_INGREDIENT_POSITION,
} from '../actions/burger-constructor';

export const addItemToConstructor = (item) => ({
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    item,
});

export const removeItemFromConstructor = (item) => ({
    type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    item,
});

export const changeIngrideintPosition = (item) => ({
    type: UPDATE_INGREDIENT_POSITION,
    item
});