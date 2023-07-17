import { Middleware } from "redux"
import { TWSStoreActions } from "../types";
import { TSocketData } from "../../utils/types";
import {
    WS_CONNECT,
    TWSActions,
} from "../actions/web-socket";
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
            const { wsConnect, wsConnecting, wsOpen, wsDisconnect, wsError, wsMessage, wsClose } = wsActions

            if (WS_CONNECT === type) {
                console.log('Websocket connecting')
                url = action.payload.url
                const tokenParam = getCookie('accessToken')? `?token=${getCookie('accessToken')?.replace('Bearer ', '')}` : ''
                socket = new WebSocket(`${url}${tokenParam}`)
                isConnected = true
                window.clearTimeout(reconnectTimerRef)
                reconnectTimerRef = 0
                dispatch(wsConnecting())
            }

            if (socket && wsConnecting().type === type) {
                socket.onopen = () => {
                    console.log('open')
                    dispatch(wsOpen())
                }

                socket.onerror = (event: Event) => {
                    dispatch(wsError('Websocket error'))
                }

                socket.onmessage = (event: MessageEvent) => {
                    const {data} = event
                    const parsedData: TSocketData = JSON.parse(data)
                    dispatch(wsMessage(parsedData))
                }

                socket.onclose = (event: CloseEvent) => {
                    if (event.code !== 1000) {
                        console.log('error', event.code.toString())
                        dispatch(wsError(`Error: ${event.code.toString()}`))
                    }
                    if (isConnected) {
                        dispatch(wsConnecting())
                        reconnectTimerRef = window.setTimeout(() => {
                            dispatch(wsConnect(url))
                        }, 10000)
                    }
                    console.log('close')
                    dispatch(wsClose())
                }
            }

            if (socket && wsDisconnect().type === type) {
                console.log('disconnect')
                window.clearTimeout(reconnectTimerRef)
                isConnected = false
                reconnectTimerRef = 0
                dispatch(wsDisconnect())
                socket.close()
            }

            next(action)
        }
    }
}