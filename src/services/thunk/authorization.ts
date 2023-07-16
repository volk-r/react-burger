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
} from '../actions/authorization';
import {
    registerAccount,
    userData,
    refreshTokenRequest,
    saveTokens,
    cleanupTokenData,
    accountAuthorization,
    closeSession,
} from "../../utils/burger-api";
import { IFormValues } from "../../utils/interfaces";
import { AppDispatch } from "../types";

export function authorization(form: IFormValues) {
    return function (dispatch: AppDispatch) {
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

export function registration(form: IFormValues) {
    return function (dispatch: AppDispatch) {
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
    return function (dispatch: AppDispatch) {
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

const refreshToken = (afterRefresh: { (dispatch: AppDispatch): void; (dispatch: AppDispatch): void; }) => (dispatch: AppDispatch) => {
    refreshTokenRequest()
        .then((res) => {
            saveTokens(res.refreshToken, res.accessToken);
            dispatch(afterRefresh);
        }).catch( error => {
            dispatch({
                type: GET_USER_DATA_FAILED,
                payload: {
                    message: error.message,
                },
            })
        })
};

export function updateUserData(newUseData: IFormValues) {
    return function (dispatch: AppDispatch) {
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

export function closeCurrentSession() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: CLOSE_USER_SESSION
        })

        closeSession().then( () => {
            cleanupTokenData();
            dispatch({
                type: CLOSE_USER_SESSION_SUCCESS,
            })
        }).catch( error => {
            cleanupTokenData();
            dispatch({
                type: CLOSE_USER_SESSION_FAILED,
                payload: {
                    message: error.message,
                },
            })
        })
    }
}

export function resetPassword(email: string) {
    return function (dispatch: AppDispatch) {
        cleanupTokenData();
        dispatch({
            type: RESET_PASSWORD_EMAIL,
            payload: {
                resetPasswordEmail: email
            }
        })
    }
}