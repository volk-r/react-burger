import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
} from '../actions/burger-constructor';
import { BUN_TYPE } from "../../utils/constants";
import UnknownBun from "../../images/bun-unknown.png";

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
                state.ingredients = [...state.ingredients, action.item];
            }

            return state;
        }
        case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
            if (action.item.type === BUN_TYPE) {
                state.bun = {};
            } else {
                state.ingredients = state.ingredients.filter(item => item._id !== action.item._id);
            }

            return state;
        }
        default: {
            return state
        }
    }
}