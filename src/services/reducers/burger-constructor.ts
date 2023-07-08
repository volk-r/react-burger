import {
    ADD_INGREDIENT_TO_CONSTRUCTOR, TBurgerConstructorActions,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    UPDATE_INGREDIENT_POSITION,
} from '../actions/burger-constructor';
import { BUN_TYPE } from "../../utils/constants";
import UnknownBun from "../../images/bun-unknown.png";
import update from 'immutability-helper';
import { TConstructorIngredient } from "../../utils/types";

export type TBurgerConstructorState = {
    bun: TConstructorIngredient,
    ingredients: Array<TConstructorIngredient>,
    isDisabledOrderButton: boolean,
}

const initialState: TBurgerConstructorState = {
    bun: {
        uuid: "0",
        _id: "0",
        name: "Нет булка, совсем нет",
        type: BUN_TYPE,
        price: 0,
        image: UnknownBun,
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        image_mobile: UnknownBun,
        image_large: UnknownBun,
        __v: 0,
    },
    ingredients: [],
    isDisabledOrderButton: false,
}

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions): TBurgerConstructorState => {
    switch (action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR: {
            return {
                ...state,
                bun: action.payload.item.type === BUN_TYPE
                    ? action.payload.item
                    : state.bun,
                ingredients:
                    action.payload.item.type === BUN_TYPE
                        ? state.ingredients
                        : [...state.ingredients, action.payload.item],
                isDisabledOrderButton: action.payload.item.type === BUN_TYPE || state.bun !== initialState.bun
            };
        }
        case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item.uuid !== action.payload.item.uuid)
            };
        }
        case UPDATE_INGREDIENT_POSITION : {
            if (action.payload.dragIndex > action.payload.hoverIndex) {
                return update(state, {
                    ingredients: {
                        $splice: [
                            [action.payload.hoverIndex, 1],
                            [action.payload.dragIndex, 0, ...state.ingredients.slice(action.payload.hoverIndex, action.payload.dragIndex)],
                        ],
                    }
                })} else {
                return update(state, {
                    ingredients: {
                        $splice: [
                            [action.payload.dragIndex, 1],
                            [action.payload.hoverIndex, 0, ...state.ingredients.slice(action.payload.dragIndex, action.payload.hoverIndex)],
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