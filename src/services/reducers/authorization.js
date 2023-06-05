import {
    AUTHORIZATION_PROCESS,
    AUTHORIZATION_PROCESS_SUCCESS,
    AUTHORIZATION_PROCESS_FAILED,
    AUTHORIZATION_REFRESH_TOKEN,
    AUTHORIZATION_REFRESH_SUCCESS,
    AUTHORIZATION_REFRESH_FAILED, GET_USER_DATA, GET_USER_DATA_SUCCESS, GET_USER_DATA_FAILED,
} from '../actions/authorization';

const initialState = {
    user         : null,
    accessToken  : null,
    refreshToken : null,
    request      : false,
    requestFailed: false,
}

export const authorizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHORIZATION_PROCESS: {
            return {
                ...state,
                request      : true,
                requestFailed: false,
            };
        }
        case AUTHORIZATION_PROCESS_SUCCESS: {
            return {
                ...state,
                user        : action.payload.user,
                accessToken : action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                request     : false,
            };
        }
        case AUTHORIZATION_PROCESS_FAILED: {
            return {
                ...state,
                request      : false,
                requestFailed: true,
            };
        }
        case AUTHORIZATION_REFRESH_TOKEN: {
            return {
                ...state,
                request      : true,
                requestFailed: false,
            };
        }
        case AUTHORIZATION_REFRESH_SUCCESS: {
            return {
                ...state,
                request     : false,
                accessToken : action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        }
        case AUTHORIZATION_REFRESH_FAILED: {
            return {
                ...initialState,
                requestFailed: true,
            };
        }
        case GET_USER_DATA: {
            return {
                ...state,
                request      : true,
                requestFailed: false,
            };
        }
        case GET_USER_DATA_SUCCESS: {
            return {
                ...state,
                user        : action.payload.user,
                request     : false,
            };
        }
        case GET_USER_DATA_FAILED: {
            return {
                ...state,
                request      : false,
                requestFailed: true,
            };
        }
        default: {
            return state
        }
    }
}