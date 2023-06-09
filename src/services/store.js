import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { rootReducer } from './reducers/index';
import thunk from 'redux-thunk';

const composeEnhancers = composeWithDevTools({});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk),
));

export default store;
