import {
  LoginRequestModel,
  LoginResponseModel,
  RegisterRequestModel,
} from "../models/auth";
import { HttpResponse } from "../models/http";
import axiosClient, { handleRequest } from "./axiosClient";

const authApi = {
  login: (
    request: LoginRequestModel
  ): Promise<HttpResponse<LoginResponseModel>> => {
    const url = "/api/login";
    return handleRequest(axiosClient.post(url, request));
  },
  register: (request: RegisterRequestModel): Promise<HttpResponse<unknown>> => {
    const url = "/api/register";
    return handleRequest(axiosClient.post(url, request));
  },
};

export default authApi;
