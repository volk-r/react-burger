import {
    SET_INGREDIENT_DETAILS,
    RESET_INGREDIENT_DETAILS
} from "../actions/ingredient-details";

export const setIngredientDetails = (item) => ({
    type: SET_INGREDIENT_DETAILS,
    item,
});

export const resetIngredientDetails = () => ({
    type: RESET_INGREDIENT_DETAILS,
});