import {
    AUTHORIZATION_PROCESS,
    AUTHORIZATION_PROCESS_SUCCESS,
    AUTHORIZATION_PROCESS_FAILED,
    AUTHORIZATION_REFRESH_TOKEN,
    AUTHORIZATION_REFRESH_SUCCESS,
    AUTHORIZATION_REFRESH_FAILED,
    GET_USER_DATA,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILED,
} from '../actions/authorization';
import {registerAccount, userData} from "../../utils/burger-api";

export function authorization(form) {
    return function (dispatch) {
        dispatch({
            type: AUTHORIZATION_PROCESS
        })

        registerAccount(form).then( data  => {
            dispatch({
                type: AUTHORIZATION_PROCESS_SUCCESS,
                payload: {
                    user: data.user,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                },
            })
        }).catch( err => {
            dispatch({
                type: AUTHORIZATION_PROCESS_FAILED
            })
        })
    }
}

export function getUserData(token) {
    return function (dispatch) {
        dispatch({
            type: GET_USER_DATA
        })

        userData(token).then( data  => {
            dispatch({
                type: GET_USER_DATA_SUCCESS,
                payload: {
                    user: data.user,
                },
            })
        }).catch( err => {
            dispatch({
                type: GET_USER_DATA_FAILED
            })
        })
    }
}

export function updateToken() {
    // TODO
    // refreshToken
}