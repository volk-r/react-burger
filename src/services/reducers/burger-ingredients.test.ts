import { ingredientsReducer, initialState } from "./burger-ingredients";
import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_INGREDIENTS_ITEM,
    DECREASE_INGREDIENTS_ITEM,
    RESET_INGREDIENTS_COUNT,
    TIngredientsActions,
} from "../actions/burger-ingredients";
import { BUN_TYPE } from "../../utils/constants";

const MOCK_BUN = {
    "uuid": "643d69a5c3f7b9001cfa093",
    "_id": "643d69a5c3f7b9001cfa093c",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0,
    "qty": 0
};

const MOCK_INGREDIENTS = [
    {
        "uuid": "643d69a5c3f7b9001cfa094",
        "_id": "643d69a5c3f7b9001cfa0941",
        "name": "Биокотлета из марсианской Магнолии",
        "type": "main",
        "proteins": 420,
        "fat": 142,
        "carbohydrates": 242,
        "calories": 4242,
        "price": 424,
        "image": "https://code.s3.yandex.net/react/code/meat-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
        "__v": 0,
        "qty": 0
    },
    {
        "uuid": "643d69a5c3f7b9001cfa093",
        "_id": "643d69a5c3f7b9001cfa093e",
        "name": "Филе Люминесцентного тетраодонтимформа",
        "type": "main",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/meat-03.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
        "__v": 0,
        "qty": 0
    },
    {
        "uuid": "643d69a5c3f7b9001cfa094",
        "_id": "643d69a5c3f7b9001cfa0942",
        "name": "Соус Spicy-X",
        "type": "sauce",
        "proteins": 30,
        "fat": 20,
        "carbohydrates": 40,
        "calories": 30,
        "price": 90,
        "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        "__v": 0,
        "qty": 0
    },
]

const mockState = {
    ...initialState,
    burgerIngredients: {
        bun: MOCK_BUN,
        ingredients: [...MOCK_INGREDIENTS, MOCK_BUN]
    }
};
describe("ingredients reducer", () => {
    it("should return the initial state", () => {
        expect(ingredientsReducer(mockState, {} as TIngredientsActions)).toEqual(mockState);
    });

    it("should reset state", () => {
        expect(ingredientsReducer(mockState, { type: RESET_INGREDIENTS_COUNT })).toEqual({
            ...mockState,
            burgerIngredients: {
                ...mockState.burgerIngredients,
                bun: {...mockState.burgerIngredients.bun, qty: 0 },
                ingredients: mockState.burgerIngredients.ingredients.map(item => {
                    return { ...item, qty: 0 };
                })
            }
        });
    });

    describe("should handle get ingredients process", () => {
        it("should start getting ingredients process", () => {
            expect(ingredientsReducer(initialState, { type: GET_INGREDIENTS })).toEqual({
                ...initialState,
                ingredientsRequest: true
            });
        });
        it("should handle getting ingredients process success", () => {
            const action = {
                type: GET_INGREDIENTS_SUCCESS,
                payload: {
                    burgerIngredients: {
                        bun: MOCK_BUN,
                        ingredients: MOCK_INGREDIENTS,
                    }
                },
            };
            expect(ingredientsReducer(initialState, action)).toEqual({
                ...initialState,
                burgerIngredients: action.payload.burgerIngredients,
            });
        });

        it("should handle getting ingredients process failed", () => {
            const action = {
                type: GET_INGREDIENTS_FAILED,
            };
            expect(ingredientsReducer(initialState, action)).toEqual({
                ...initialState,
                ingredientsFailed: true,
            });
        });
    });

    describe("should change count of ingredients", () => {
        it("should increase count of ingredients (bun)", () => {
            const action = {
                type: INCREASE_INGREDIENTS_ITEM,
                payload: {
                    item: MOCK_BUN
                }
            };

            let ingredients = mockState.burgerIngredients.ingredients;

            if (action.payload.item.type === BUN_TYPE) {
                ingredients = ingredients.map(item =>
                    item.type === BUN_TYPE ? { ...item, qty: item.qty ? --item.qty : 0 } : item
                )
            }

            ingredients = ingredients.map(item =>
                item._id === action.payload.item._id ? { ...item, qty: item.qty ? ++item.qty : 1 } : item
            )

            expect(ingredientsReducer(mockState, action)).toEqual({
                ...mockState,
                burgerIngredients: {
                    ...mockState.burgerIngredients,
                    ingredients: ingredients
                }
            });
        });

        it("should increase count of ingredients", () => {
            const action = {
                type: INCREASE_INGREDIENTS_ITEM,
                payload: {
                    item: MOCK_INGREDIENTS[0]
                }
            };
            expect(ingredientsReducer(mockState, action)).toEqual({
                ...mockState,
                burgerIngredients: {
                    ...mockState.burgerIngredients,
                    ingredients: mockState.burgerIngredients.ingredients.map(item =>
                        item._id === action.payload.item._id ? { ...item, qty: item.qty ? ++item.qty : 1 } : item
                    )
                }
            });
        });

        it("should decrease count of ingredients (bun)", () => {
            const action = {
                type: DECREASE_INGREDIENTS_ITEM,
                payload: {
                    item: MOCK_BUN
                }
            };
            expect(ingredientsReducer(mockState, action)).toEqual({
                ...mockState,
                burgerIngredients: {
                    ...mockState.burgerIngredients,
                    bun: { ...mockState.burgerIngredients.bun, qty: 0 }
                }
            });
        });

        it("should decrease count of ingredients", () => {
            const action = {
                type: DECREASE_INGREDIENTS_ITEM,
                payload: {
                    item: MOCK_INGREDIENTS[0]
                }
            };
            expect(ingredientsReducer(mockState, action)).toEqual({
                ...mockState,
                burgerIngredients: {
                    ...mockState.burgerIngredients,
                    ingredients: mockState.burgerIngredients.ingredients.map(item =>
                        item._id === action.payload.item._id ? { ...item, qty: item.qty ? ++item.qty : 0 } : item
                    )
                }
            });
        });
    });
});