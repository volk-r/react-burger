import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware/socket-middleware';
import { TWSStoreActions } from "./types";

import {
    WS_CONNECT,
    WS_CONNECTION_DISCONNECT,
    WS_CONNECTING,
    WS_CONNECTION_OPEN,
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE
} from "./actions/web-socket";

const wsActions: TWSStoreActions = {
    wsConnect: WS_CONNECT,
    wsDisconnect: WS_CONNECTION_DISCONNECT,
    wsConnecting: WS_CONNECTING,
    wsOpen: WS_CONNECTION_OPEN,
    wsClose: WS_CONNECTION_CLOSE,
    wsError: WS_CONNECTION_ERROR,
    wsMessage: WS_GET_MESSAGE
};

const composeEnhancers = composeWithDevTools({});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(
        thunk,
        socketMiddleware(wsActions),
    ),
));

export default store;
