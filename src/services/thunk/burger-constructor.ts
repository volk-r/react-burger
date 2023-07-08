import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    UPDATE_INGREDIENT_POSITION,
} from '../actions/burger-constructor';
import uuid from 'react-uuid'
import { TConstructorIngredient } from "../../utils/types";

export const addItemToConstructor = (item: TConstructorIngredient) => ({
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    payload: {
        item: {
            ...item,
            uuid: uuid()
        }
    }
});

export const removeItemFromConstructor = (item: TConstructorIngredient) => ({
    type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    payload: {
        item,
    }
});

export const changeIngrideintPosition = (dragIndex: number, hoverIndex: number) => ({
    type: UPDATE_INGREDIENT_POSITION,
    payload: {
        dragIndex,
        hoverIndex,
    }
});