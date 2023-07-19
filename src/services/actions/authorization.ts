import { TUser } from "../../utils/types";

export const AUTHORIZATION_PROCESS = 'AUTHORIZATION_PROCESS' as const;
export const AUTHORIZATION_PROCESS_SUCCESS: 'AUTHORIZATION_PROCESS_SUCCESS' = 'AUTHORIZATION_PROCESS_SUCCESS';
export const AUTHORIZATION_PROCESS_FAILED: 'AUTHORIZATION_PROCESS_FAILED' = 'AUTHORIZATION_PROCESS_FAILED';
export const GET_USER_DATA: 'GET_USER_DATA' = 'GET_USER_DATA';
export const GET_USER_DATA_SUCCESS: 'GET_USER_DATA_SUCCESS' = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED: 'GET_USER_DATA_FAILED' = 'GET_USER_DATA_FAILED';
export const UPDATE_USER_DATA: 'UPDATE_USER_DATA' = 'UPDATE_USER_DATA';
export const UPDATE_USER_DATA_SUCCESS: 'UPDATE_USER_DATA_SUCCESS' = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILED: 'UPDATE_USER_DATA_FAILED' = 'UPDATE_USER_DATA_FAILED';
export const CLOSE_USER_SESSION: 'CLOSE_USER_SESSION' = 'CLOSE_USER_SESSION';
export const CLOSE_USER_SESSION_SUCCESS:'CLOSE_USER_SESSION_SUCCESS' = 'CLOSE_USER_SESSION_SUCCESS';
export const CLOSE_USER_SESSION_FAILED: 'CLOSE_USER_SESSION_FAILED' = 'CLOSE_USER_SESSION_FAILED';
export const RESET_PASSWORD_EMAIL: 'RESET_PASSWORD_EMAIL' = 'RESET_PASSWORD_EMAIL';

export interface IAuthorizationAction {
    readonly type: typeof AUTHORIZATION_PROCESS;
}

export interface IAuthorizationSuccessAction {
    readonly type: typeof AUTHORIZATION_PROCESS_SUCCESS;
    readonly payload: {
        readonly user: TUser,
    };
}

export interface IAuthorizationFailedAction {
    readonly type: typeof AUTHORIZATION_PROCESS_FAILED;
    readonly payload: {
        readonly message: string | null,
    };
}

export interface IUserDataAction {
    readonly type: typeof GET_USER_DATA;
}

export interface IUserDataSuccessAction {
    readonly type: typeof GET_USER_DATA_SUCCESS;
    readonly payload: {
        readonly user: TUser,
    };
}

export interface IUserDataFailedAction {
    readonly type: typeof GET_USER_DATA_FAILED;
    readonly payload: {
        readonly message: string | null,
    };
}

export interface IUpdateUserDataAction {
    readonly type: typeof UPDATE_USER_DATA;
}

export interface IUpdateUserDataSuccessAction {
    readonly type: typeof UPDATE_USER_DATA_SUCCESS;
    readonly payload: {
        readonly user: TUser,
    };
}

export interface IUpdateUserDataFailedAction {
    readonly type: typeof UPDATE_USER_DATA_FAILED;
    readonly payload: {
        readonly message: string | null,
    };
}

export interface ICloseUserSessionAction {
    readonly type: typeof CLOSE_USER_SESSION;
}

export interface ICloseUserSessionSuccessAction {
    readonly type: typeof CLOSE_USER_SESSION_SUCCESS;
}

export interface ICloseUserSessionFailedAction {
    readonly type: typeof CLOSE_USER_SESSION_FAILED;
    readonly payload: {
        readonly message: string | null,
    };
}

export interface IResetPasswordEmailAction {
    readonly type: typeof RESET_PASSWORD_EMAIL;
    readonly payload: {
        readonly resetPasswordEmail: string | null,
    };
}

export type TAuthorizationActions =
    IAuthorizationAction
    | IAuthorizationSuccessAction
    | IAuthorizationFailedAction
    | IUserDataAction
    | IUserDataSuccessAction
    | IUserDataFailedAction
    | IUpdateUserDataAction
    | IUpdateUserDataSuccessAction
    | IUpdateUserDataFailedAction
    | ICloseUserSessionAction
    | ICloseUserSessionSuccessAction
    | ICloseUserSessionFailedAction
    | IResetPasswordEmailAction
;