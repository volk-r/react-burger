import {
    AUTHORIZATION_PROCESS,
    AUTHORIZATION_PROCESS_SUCCESS,
    AUTHORIZATION_PROCESS_FAILED,
    GET_USER_DATA,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILED,
    UPDATE_USER_DATA,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILED,
    CLOSE_USER_SESSION,
    CLOSE_USER_SESSION_SUCCESS,
    CLOSE_USER_SESSION_FAILED,
    RESET_PASSWORD_EMAIL,
    TAuthorizationActions,
} from '../actions/authorization';
import { TUser } from "../../utils/types";

type TAuthorizationState = {
    user              : TUser,
    request           : boolean,
    requestFailed     : boolean,
    message           : string | null,
    resetPasswordEmail: string | null,
}

const initialState: TAuthorizationState = {
    user              : null,
    request           : false,
    requestFailed     : false,
    message           : null,
    resetPasswordEmail: null,
}

export const authorizationReducer = (state = initialState, action: TAuthorizationActions): TAuthorizationState => {
    switch (action.type) {
        case AUTHORIZATION_PROCESS: {
            return {
                ...state,
                request           : true,
                requestFailed     : false,
                message           : null,
                resetPasswordEmail: null,
            };
        }
        case AUTHORIZATION_PROCESS_SUCCESS: {
            return {
                ...state,
                user              : action.payload.user,
                request           : false,
                message           : null,
                resetPasswordEmail: null,
            };
        }
        case AUTHORIZATION_PROCESS_FAILED: {
            return {
                ...state,
                request      : false,
                requestFailed: true,
                message      : action.payload.message
            };
        }
        case GET_USER_DATA: {
            return {
                ...state,
                request      : true,
                requestFailed: false,
                message      : null,
            };
        }
        case GET_USER_DATA_SUCCESS: {
            return {
                ...state,
                user   : action.payload.user,
                request: false,
                message: null,
            };
        }
        case GET_USER_DATA_FAILED: {
            return {
                ...state,
                request      : false,
                requestFailed: true,
                message      : action.payload.message
            };
        }
        case UPDATE_USER_DATA: {
            return {
                ...state,
                request           : true,
                requestFailed     : false,
                resetPasswordEmail: null,
                message           : null,
            };
        }
        case UPDATE_USER_DATA_SUCCESS: {
            return {
                ...state,
                user   : action.payload.user,
                request: false,
                message: null,
            };
        }
        case UPDATE_USER_DATA_FAILED: {
            return {
                ...state,
                request      : false,
                requestFailed: true,
                message      : action.payload.message
            };
        }
        case RESET_PASSWORD_EMAIL: {
            return {
                ...state,
                resetPasswordEmail: action.payload.resetPasswordEmail
            };
        }
        case CLOSE_USER_SESSION: {
            return {
                ...state,
                request           : true,
                requestFailed     : false,
                resetPasswordEmail: null,
                message           : null,
            };
        }
        case CLOSE_USER_SESSION_SUCCESS: {
            return initialState;
        }
        case CLOSE_USER_SESSION_FAILED: {
            return {
                ...state,
                request           : false,
                requestFailed     : true,
                resetPasswordEmail: null,
                message           : action.payload.message
            };
        }
        default: {
            return state
        }
    }
}