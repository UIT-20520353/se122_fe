import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../consts/app";
import { BaseRequestQueryParam, HttpResponse } from "../models/http";
import { SubmitTestRequest, TestDetailModel, TestModel } from "../models/test";
import { getLocalStorage } from "../utils/localStorage";
import axiosClient, { handleRequest } from "./axiosClient";

const testApi = {
  getTests: (
    params: BaseRequestQueryParam
  ): Promise<HttpResponse<TestModel[]>> => {
    const url = "/api/tests";
    return handleRequest(
      axiosClient.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${getLocalStorage(
            ACCESS_TOKEN_LOCAL_STORAGE_KEY
          )}`,
        },
      })
    );
  },
  getTest: (testId: number): Promise<HttpResponse<TestDetailModel>> => {
    const url = `/api/tests/${testId}`;
    return handleRequest(
      axiosClient.get(url, {
        headers: {
          Authorization: `Bearer ${getLocalStorage(
            ACCESS_TOKEN_LOCAL_STORAGE_KEY
          )}`,
        },
      })
    );
  },
  submitTest: (body: SubmitTestRequest): Promise<HttpResponse<unknown>> => {
    const url = "/api/tests/submit";
    return handleRequest(
      axiosClient.post(url, body, {
        headers: {
          Authorization: `Bearer ${getLocalStorage(
            ACCESS_TOKEN_LOCAL_STORAGE_KEY
          )}`,
        },
      })
    );
  },
};

export default testApi;
