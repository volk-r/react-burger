import { Middleware } from "redux"
import { RootState, TApplicationActions, TWSStoreActions } from "../types";
import { AppDispatch } from "../types";
import {
    wsCloseAction,
    wsConnectAction,
    wsConnectingAction,
    wsDisconnectAction,
    wsErrorAction,
    wsMessageAction,
    wsOpenAction
} from "../thunk/web-socket";
import { TSocketData } from "../../utils/types";
import { TWSActions } from "../actions/web-socket";

// TODO: not working as expected
export const socketMiddleware = (wsActions: TWSStoreActions): Middleware<AppDispatch, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null
        let url = '';
        let isConnected = false
        let reconnectTimerRef = 0

        return (next) => (action: TWSActions) => {
            const { dispatch } = store
            const { type } = action;
            const {
                wsConnect, wsDisconnect, wsConnecting, wsOpen, wsClose, wsError, wsMessage,
            } = wsActions

            if (wsConnect.match(type)) {
                console.log('Websocket connecting')
                console.log("type", type)
                console.log("wsConnect", wsConnect)
                console.log("action", JSON.stringify(action))
                url = action.payload.url// TODO
                socket = new WebSocket(url)
                isConnected = true
                window.clearTimeout(reconnectTimerRef)
                reconnectTimerRef = 0
                dispatch(wsConnectAction(url))
            }

            if (socket && wsConnecting.match(type)) {
                socket.onopen = () => {
                    console.log('open')
                    dispatch(wsOpenAction())
                }

                socket.onerror = (event: Event) => {
                    dispatch(wsErrorAction('Websocket error'))
                }

                socket.onmessage = (event: MessageEvent) => {
                    const {data} = event
                    const parsedData: TSocketData = JSON.parse(data)
                    dispatch(wsMessageAction(parsedData))
                }

                socket.onclose = (event: CloseEvent) => {
                    if (event.code !== 1000) {
                        console.log('error', event.code.toString())
                        dispatch(wsErrorAction(`Error: ${event.code.toString()}`))
                    }
                    if (isConnected) {
                        dispatch(wsConnectingAction())
                        reconnectTimerRef = window.setTimeout(() => {
                            dispatch(wsConnectAction(url))
                        }, 3000)
                    }
                    console.log('close')
                    dispatch(wsCloseAction())
                }
            }

            if (socket && wsDisconnect.match(type)) {
                console.log('disconnect')
                window.clearTimeout(reconnectTimerRef)
                isConnected = false
                reconnectTimerRef = 0
                dispatch(wsDisconnectAction())
                socket.close()
            }

            next(action)
        }
    }
}