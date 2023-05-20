import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { rootReducer } from './reducers/index';
import thunk from 'redux-thunk';
/*
import UnknownBun from "../images/bun-unknown.png";

const initialState = {
    ingredients: { bun: {}, ingredients: [] },
    constructorIngredients: {
        bun: {_id: "0", name: "Нет булка, совсем нет", price: 0, image: UnknownBun },
        ingredients: [],
    },
    currentIngredient: null,
    order: null,
};
*/

const composeEnhancers = composeWithDevTools({});

const store = createStore(rootReducer, /*initialState, */composeEnhancers(
    applyMiddleware(thunk),
));

export default store;
