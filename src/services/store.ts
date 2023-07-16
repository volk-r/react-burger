import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware/socket-middleware';
import { TWSStoreActions } from "./types";
import {
    wsCloseAction,
    wsConnectAction,
    wsConnectingAction,
    wsDisconnectAction,
    wsErrorAction,
    wsMessageAction,
    wsOpenAction
} from "./thunk/web-socket";

const wsActions: TWSStoreActions = {
    wsConnect: wsConnectAction,
    wsDisconnect: wsDisconnectAction,
    wsConnecting: wsConnectingAction,
    wsOpen: wsOpenAction,
    wsClose: wsCloseAction,
    wsError: wsErrorAction,
    wsMessage: wsMessageAction,
}

const composeEnhancers = composeWithDevTools({});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(
        thunk,
        socketMiddleware(wsActions),
    ),
));

export default store;
