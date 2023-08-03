import {
    authorizationReducer,
    initialState,
} from "./authorization";
import {
    AUTHORIZATION_PROCESS,
    AUTHORIZATION_PROCESS_FAILED,
    AUTHORIZATION_PROCESS_SUCCESS,
    CLOSE_USER_SESSION,
    CLOSE_USER_SESSION_FAILED,
    CLOSE_USER_SESSION_SUCCESS,
    GET_USER_DATA,
    GET_USER_DATA_FAILED,
    GET_USER_DATA_SUCCESS,
    RESET_PASSWORD_EMAIL,
    UPDATE_USER_DATA,
    UPDATE_USER_DATA_FAILED,
    UPDATE_USER_DATA_SUCCESS,
    TAuthorizationActions,
} from "../actions/authorization";
import { TEST_EMAIL } from "../../utils/constants";

describe("authorization reducer", () => {
    const mock = {
        user: { name: "some-name", email: TEST_EMAIL },
        message: "some massage",
    };

    it("should return the initial state", () => {
        expect(authorizationReducer(undefined, {} as TAuthorizationActions)).toEqual(initialState);
    });

    describe("should handle login process", () => {
        it("should start authorization process", () => {
            expect(authorizationReducer(initialState, { type: AUTHORIZATION_PROCESS })).toEqual({
                ...initialState,
                request: true
            });
        });

        it("should handle login success", () => {
            const action = {
                type: AUTHORIZATION_PROCESS_SUCCESS,
                payload: {
                    user: mock.user
                },
            };
            expect(authorizationReducer(initialState, action)).toEqual({
                ...initialState,
                user: action.payload.user,
            });
        });

        it("should handle login failed", () => {
            const action = {
                type: AUTHORIZATION_PROCESS_FAILED,
                payload: {
                    message: mock.message
                }
            };
            expect(authorizationReducer(initialState, action)).toEqual({
                ...initialState,
                requestFailed: true,
                message      : action.payload.message
            });
        });
    });

    describe("should handle user data changes", () => {
        it("should start getting user data process", () => {
            expect(authorizationReducer(initialState, { type: GET_USER_DATA })).toEqual({
                ...initialState,
                request: true
            });
        });

        it("should handle get user data", () => {
            const action = {
                type: GET_USER_DATA_SUCCESS,
                payload: {
                    user: mock.user,
                }
            };
            expect(authorizationReducer(initialState, action)).toEqual({
                ...initialState,
                user: action.payload.user,
            });
        });

        it("should handle get user data failed", () => {
            const action = {
                type: GET_USER_DATA_FAILED,
                payload: {
                    message: mock.message
                }
            };
            expect(authorizationReducer(initialState, action)).toEqual({
                ...initialState,
                requestFailed: true,
                message      : action.payload.message
            });
        });

        it("should handle update user data", () => {
            const action = { type: UPDATE_USER_DATA };
            expect(authorizationReducer(initialState, action)).toEqual({
                ...initialState,
                request: true
            });
        });

        it("should handle update user data", () => {
            const action = {
                type: UPDATE_USER_DATA_SUCCESS,
                payload: {
                    user: mock.user
                },
            };
            expect(authorizationReducer(initialState, action)).toEqual({
                ...initialState,
                user: action.payload.user,
            });
        });

        it("should handle update user data failed", () => {
            const action = {
                type: UPDATE_USER_DATA_FAILED,
                payload: {
                    message: mock.message
                }
            };
            expect(authorizationReducer(initialState, action)).toEqual({
                ...initialState,
                requestFailed: true,
                message      : action.payload.message
            });
        });
    });

    it("should handle resetPassword", () => {
        const action = {
            type: RESET_PASSWORD_EMAIL,
            payload: {
                resetPasswordEmail: mock.user.email
            }
        };
        expect(authorizationReducer(initialState, action)).toEqual({
            ...initialState,
            resetPasswordEmail: action.payload.resetPasswordEmail,
        });
    });

    describe("should handle close user session", () => {
        it("should handle start closing user session", () => {
            const action = { type: CLOSE_USER_SESSION };
            expect(authorizationReducer(initialState, action)).toEqual({
                ...initialState,
                request: true,
            });
        });

        it("should handle close user session", () => {
            const action = { type: CLOSE_USER_SESSION_SUCCESS };
            expect(authorizationReducer(initialState, action)).toEqual(initialState);
        });

        it("should handle closing user session failed", () => {
            const action = {
                type: CLOSE_USER_SESSION_FAILED,
                payload: {
                    message: mock.message
                }
            };
            expect(authorizationReducer(initialState, action)).toEqual({
                ...initialState,
                requestFailed: true,
                message: action.payload.message
            });
        });
    });
});