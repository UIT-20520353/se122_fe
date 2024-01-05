import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../consts/app";
import { ChatRoomModel } from "../models/chatroom";
import { HttpResponse } from "../models/http";
import { getLocalStorage } from "../utils/localStorage";
import axiosClient, { handleRequest } from "./axiosClient";

const chatroomApi = {
  getChatrooms: (): Promise<HttpResponse<ChatRoomModel[]>> => {
    const url = "/api/chatrooms";
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
};

export default chatroomApi;
