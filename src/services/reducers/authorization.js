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
    CLEANUP_USER_DATA,
    RESET_PASSWORD_EMAIL,
} from '../actions/authorization';

const initialState = {
    user              : null,
    request           : false,
    requestFailed     : false,
    message           : null,
    resetPasswordEmail: null,
}

export const authorizationReducer = (state = initialState, action) => {
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
        case CLEANUP_USER_DATA: {
            return initialState;
        }
        default: {
            return state
        }
    }
}