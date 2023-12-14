export interface LoginResponseModel {
  id: number;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequestModel {
  email: string;
  password: string;
}
