import {
    burgerConstructorReducer,
    initialState
} from "./burger-constructor";
import { TEST_ACTION } from "../actions/test";
import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    UPDATE_INGREDIENT_POSITION,
} from "../actions/burger-constructor";

const MOCK_BUNS = [
    {
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
        "__v": 0
    },
    {
        "uuid": "643d69a5c3f7b9001cfa093",
        "_id": "643d69a5c3f7b9001cfa093d",
        "name": "Флюоресцентная булка R2-D3",
        "type": "bun",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/bun-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
        "__v": 0
    },
];

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
        "__v": 0
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
        "__v": 0
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
        "__v": 0
    },
]

describe("burgerConstructor reducer", () => {
    it("should return the initial state", () => {
        expect(burgerConstructorReducer(initialState, { type: TEST_ACTION })).toEqual(initialState);
    });

    it("should reset state", () => {
        expect(burgerConstructorReducer(initialState, { type: CLEAR_CONSTRUCTOR })).toEqual(initialState);
    });

    it("should add ingredient to constructor", () => {
        const mockState = {
            ...initialState,
            ingredients: MOCK_INGREDIENTS
        };

        const action = {
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            payload: {
                item: MOCK_INGREDIENTS[0]
            },
        };

        expect(burgerConstructorReducer(mockState, action)).toEqual({
            ...mockState,
            ingredients: [...mockState.ingredients, action.payload.item]
        });
    });

    it("should add bun to constructor", () => {
        const mockState = {
            ...initialState,
            bun: MOCK_BUNS[0],
        };

        const action = {
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            payload: {
                item: MOCK_BUNS[0]
            },
        };

        expect(burgerConstructorReducer(mockState, action)).toEqual({
            ...mockState,
            isDisabledOrderButton: true,
            bun: action.payload.item,
        });
    });

    it("should replace bun in constructor", () => {
        const mockState = {
            ...initialState,
            isDisabledOrderButton: true,
            bun: MOCK_BUNS[0],
        };

        const action = {
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            payload: {
                item: MOCK_BUNS[1]
            },
        };

        expect(burgerConstructorReducer(mockState, action)).toEqual({
            ...mockState,
            bun: action.payload.item,
        });
    });

    it("should remove ingredient from constructor", () => {
        const mockState = {
            ...initialState,
            ingredients: MOCK_INGREDIENTS
        };

        const action = {
            type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
            payload: {
                item: MOCK_INGREDIENTS[1]
            },
        };

        expect(burgerConstructorReducer(mockState, action)).toEqual({
            ...mockState,
            ingredients: MOCK_INGREDIENTS.filter(item => item.uuid !== action.payload.item.uuid),
        });
    });

    it('handles moveIngredient action', () => {
        let state = burgerConstructorReducer(initialState, {
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            payload: {
                item: MOCK_INGREDIENTS[0]
        }});
        state = burgerConstructorReducer(state, {
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            payload: {
                item: MOCK_INGREDIENTS[1]
        }});
        state = burgerConstructorReducer(state, {
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            payload: {
                item: MOCK_INGREDIENTS[2]
        }});

        expect(state.ingredients).toEqual([
            MOCK_INGREDIENTS[0],
            MOCK_INGREDIENTS[1],
            MOCK_INGREDIENTS[2],
        ]);

        let action = {
            type: UPDATE_INGREDIENT_POSITION,
            payload: {
                dragIndex: 1,
                hoverIndex: 2,
            }
        };
        state = burgerConstructorReducer(state, action);

        expect(state.ingredients).toEqual([
            MOCK_INGREDIENTS[0],
            MOCK_INGREDIENTS[2],
            MOCK_INGREDIENTS[1],
        ]);

        state = burgerConstructorReducer(state, action);

        expect(state.ingredients).toEqual([
            MOCK_INGREDIENTS[0],
            MOCK_INGREDIENTS[1],
            MOCK_INGREDIENTS[2],
        ]);
    });
});