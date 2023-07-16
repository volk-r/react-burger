import { Middleware } from "redux"
import { TWSStoreActions } from "../types";
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
import { getCookie } from "../../utils/utils";

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
    return (store) => {
        let socket: WebSocket | null = null
        let url = '';
        let isConnected = false
        let reconnectTimerRef = 0

        return (next) => (action: TWSActions) => {
            const { dispatch } = store
            const { type } = action;
            const { wsConnect, wsDisconnect, wsConnecting } = wsActions

            if (wsConnect === type) {
                console.log('Websocket connecting')
                url = action.payload.url
                const tokenParam = getCookie('accessToken')? `?token=${getCookie('accessToken')?.replace('Bearer ', '')}` : ''
                socket = new WebSocket(`${url}${tokenParam}`)
                isConnected = true
                window.clearTimeout(reconnectTimerRef)
                reconnectTimerRef = 0
                dispatch(wsConnectingAction())
            }

            if (socket && wsConnecting === type) {
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
                        }, 10000)
                    }
                    console.log('close')
                    dispatch(wsCloseAction())
                }
            }

            if (socket && wsDisconnect === type) {
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