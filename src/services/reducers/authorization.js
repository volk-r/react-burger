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
} from '../actions/authorization';

const initialState = {
    user         : null,
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
        case UPDATE_USER_DATA: {
            return {
                ...state,
                request      : true,
                requestFailed: false,
            };
        }
        case UPDATE_USER_DATA_SUCCESS: {
            return {
                ...state,
                user   : action.payload.user,
                request: false,
            };
        }
        case UPDATE_USER_DATA_FAILED: {
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