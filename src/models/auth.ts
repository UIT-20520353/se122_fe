export interface LoginResponseModel {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequestModel {
  email: string;
  password: string;
}
