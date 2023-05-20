import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers/index';

const initialState = {
    ingredients: [],
    constructorIngredients: [],
    currentIngredient: null,
    order: null,
};

const store = createStore(rootReducer, initialState, composeWithDevTools());

export default store;
