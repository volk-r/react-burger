import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    UPDATE_INGREDIENT_POSITION,
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
            return {
                ...state,
                bun: action.payload.type === BUN_TYPE
                        ? action.payload
                        : state.bun,
                ingredients:
                    action.payload.type === BUN_TYPE
                        ? state.ingredients
                        : [...state.ingredients, action.payload]
            };
        }
        case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item.uuid !== action.item.uuid)
            };
        }
        case UPDATE_INGREDIENT_POSITION: {
            return {
                ...state,
                ingredients: action.item
            };
        }
        default: {
            return state
        }
    }
}