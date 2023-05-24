import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
} from '../actions/burger-constructor';
import { BUN_TYPE } from "../../utils/constants";
import UnknownBun from "../../images/bun-unknown.png";
import uuid from 'react-uuid'

const initialState = {
    bun: {_id: "0", name: "Нет булка, совсем нет", price: 0, image: UnknownBun },
    ingredients: [],
}

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR: {
            if (action.item.type === BUN_TYPE) {
                state.bun = action.item;
            } else {
                action.item.uuid = uuid();
                [...state.ingredients] = [...state.ingredients, action.item];
            }

            return state;
        }
        case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item.uuid !== action.item.uuid)
            };
        }
        default: {
            return state
        }
    }
}