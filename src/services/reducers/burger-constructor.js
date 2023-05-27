import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    UPDATE_INGREDIENT_POSITION,
} from '../actions/burger-constructor';
import { BUN_TYPE } from "../../utils/constants";
import UnknownBun from "../../images/bun-unknown.png";
import update from 'immutability-helper';

const initialState = {
    bun                  : {_id: "0", name: "Нет булка, совсем нет", price: 0, image: UnknownBun },
    ingredients          : [],
    isDisabledOrderButton: false,
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
                        : [...state.ingredients, action.payload],
                isDisabledOrderButton: action.payload.type === BUN_TYPE
            };
        }
        case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item.uuid !== action.item.uuid)
            };
        }
        case UPDATE_INGREDIENT_POSITION : {
            if (action.dragIndex > action.hoverIndex) {
                return update(state, {
                    ingredients: {
                        $splice: [
                            [action.hoverIndex, 1],
                            [action.dragIndex, 0, ...state.ingredients.slice(action.hoverIndex, action.dragIndex)],
                        ],
                    }
                })} else {
                return update(state, {
                    ingredients: {
                        $splice: [
                            [action.dragIndex, 1],
                            [action.hoverIndex, 0, ...state.ingredients.slice(action.dragIndex, action.hoverIndex)],
                        ],
                    }
                })
            }
        }
        default: {
            return state
        }
    }
}