export interface LoginResponseModel {
  id: number;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequestModel {
  email: string;
  password: string;
}

export interface RegisterRequestModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  gender: number;
  age: number;
}
