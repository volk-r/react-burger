import {
    SET_INGREDIENT_DETAILS,
    RESET_INGREDIENT_DETAILS,
} from "../actions/ingredient-details";

const initialState = {
    selectedItem: null,
}

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INGREDIENT_DETAILS: {
            return {
                ...state,
                selectedItem: action.item,
            };
        }
        case RESET_INGREDIENT_DETAILS: {
            return initialState;
        }
        default: {
            return state
        }
    }
}