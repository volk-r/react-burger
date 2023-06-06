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
import {
    registerAccount,
    userData,
    refreshTokenRequest,
    saveTokens,
    cleanupTokenData,
    accountAuthorization,
} from "../../utils/burger-api";

export function authorization(form) {
    return function (dispatch) {
        dispatch({
            type: AUTHORIZATION_PROCESS
        })

        accountAuthorization(form).then( data => {
            saveTokens(data.refreshToken, data.accessToken);
            dispatch({
                type: AUTHORIZATION_PROCESS_SUCCESS,
                payload: {
                    user: data.user,
                },
            })
        }).catch( error => {
            dispatch({
                type: AUTHORIZATION_PROCESS_FAILED,
                payload: {
                    message: error.message,
                },
            })
        })
    }
}

export function registration(form) {
    return function (dispatch) {
        dispatch({
            type: AUTHORIZATION_PROCESS
        })

        registerAccount(form).then( data => {
            saveTokens(data.refreshToken, data.accessToken);
            dispatch({
                type: AUTHORIZATION_PROCESS_SUCCESS,
                payload: {
                    user: data.user,
                },
            })
        }).catch( error => {
            dispatch({
                type: AUTHORIZATION_PROCESS_FAILED,
                payload: {
                    message: error.message,
                },
            })
        })
    }
}

export function getUserData() {
    return function (dispatch) {
        dispatch({
            type: GET_USER_DATA
        })

        userData().then( data => {
            dispatch({
                type: GET_USER_DATA_SUCCESS,
                payload: {
                    user: data.user,
                },
            })
        }).catch( error => {
            if (error.message === 'jwt expired') {
                dispatch(refreshToken(getUserData()));
            } else {
                dispatch({
                    type: GET_USER_DATA_FAILED,
                    payload: {
                        message: error.message,
                    },
                })
            }
        })
    }
}

const refreshToken = (afterRefresh) => (dispatch) => {
    refreshTokenRequest()
        .then((res) => {
            saveTokens(res.refreshToken, res.accessToken);
            dispatch(afterRefresh);
        })
};

export function updateUserData(newUseData) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_USER_DATA
        })

        userData(newUseData).then( data => {
            dispatch({
                type: UPDATE_USER_DATA_SUCCESS,
                payload: {
                    user: data.user,
                },
            })
        }).catch( error => {
            if (error.message === 'jwt expired') {
                dispatch(refreshToken(updateUserData(newUseData)));
            } else {
                dispatch({
                    type: UPDATE_USER_DATA_FAILED,
                    payload: {
                        message: error.message,
                    },
                })
            }
        })
    }
}

export function cleanupStore() {
    return function (dispatch) {
        cleanupTokenData();
        dispatch({
            type: CLEANUP_USER_DATA
        })
    }
}

export function resetPassword(email) {
    return function (dispatch) {
        cleanupTokenData();
        dispatch({
            type: RESET_PASSWORD_EMAIL,
            payload: {
                resetPasswordEmail: email
            }
        })
    }
}