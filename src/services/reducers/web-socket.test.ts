import {
    wsReducer,
    initialState
} from "./web-socket";
import {
    TWSActions,
    WS_CONNECTING,
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_OPEN,
    WS_GET_MESSAGE
} from "../actions/web-socket";
import { WebsocketStatus } from "../../utils/types";

describe("ws reducer", () => {
    it("should return the initial state", () => {
        expect(wsReducer(undefined, {} as TWSActions)).toEqual(initialState);
    });

    it("should handle start websocket connection", () => {
        expect(wsReducer(initialState, { type: WS_CONNECTING })).toEqual({
            ...initialState,
            status: WebsocketStatus.CONNECTING
        });
    });

    it("should handle open websocket connection", () => {
        expect(wsReducer(initialState, { type: WS_CONNECTION_OPEN })).toEqual({
            ...initialState,
            status: WebsocketStatus.ONLINE
        });
    });

    it("should handle open websocket connection", () => {
        const message = "connection failed";
        expect(wsReducer(initialState, { type: WS_CONNECTION_ERROR, payload: { connectionError: message } })).toEqual({
            ...initialState,
            connectionError: message,
        });
    });

    it("should handle close websocket connection", () => {
        expect(wsReducer(initialState, { type: WS_CONNECTION_CLOSE })).toEqual({
            ...initialState,
            status: WebsocketStatus.OFFLINE,
        });
    });

    let mockData = {
        success: true,
        orders: [
            {
                _id: '64bc28c282e277001bf957bc',
                ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
                status: 'done',
                name: 'Space флюоресцентный бургер',
                createdAt: '2023-07-22T19:06:42.199Z',
                updatedAt: '2023-07-22T19:06:42.561Z',
                number: 13984
            },
            {
                _id: '64bc28c082e277001bf957b8',
                ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0942'],
                status: 'done',
                name: 'Флюоресцентный spicy бургер',
                createdAt: '2023-07-22T19:06:40.361Z',
                updatedAt: '2023-07-22T19:06:40.494Z',
                number: 13983
            },
        ],
        total: 13658,
        totalToday: 131,
    };

    it("should handle getting message via websocket connection", () => {
        expect(wsReducer(initialState, { type: WS_GET_MESSAGE, payload: { messages: mockData } })).toEqual({
            ...initialState,
            orders: mockData.orders,
            total: mockData.total,
            totalToday: mockData.totalToday,
        });
    });
});