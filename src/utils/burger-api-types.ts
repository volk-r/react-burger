export type TApiResult = {
  success: boolean;
}

export type TApiMessage = {
  message: string;
} & TApiResult;

export type TApiUserData = {
  user: {
    email: string;
    name: string;
  };
} & TApiResult;

export type TApiTokens = {
  accessToken: string;
  refreshToken: string;
} & TApiResult;

export type TApiUserRegister = TApiResult & TApiUserData & TApiTokens;