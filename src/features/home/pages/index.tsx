import React, { useEffect, useMemo } from "react";
import SockJS from "sockjs-client/dist/sockjs.js";
import { Message, over } from "stompjs";
import { useAppSelector } from "../../../app/hooks";
import PersonalCart from "../../../components/PersonalCart/PersonalCart";
import { MessageRequest, MessageResponse } from "../../../models/message";
import { selectProfile } from "../../../redux/globalSlice";

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  const profile = useAppSelector(selectProfile);

  const stompClient = useMemo(
    () => over(new SockJS("http://localhost:8080/ws")),
    []
  );
  stompClient.debug = () => {};
  const connect = () => {
    stompClient.connect({}, onConnected, onError);
  };

  const onMessageReceived = (payload: Message) => {
    const payloadData: MessageResponse = JSON.parse(payload.body);
    console.log(payloadData);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (error: any) => {
    console.log(error);
  };

  const onConnected = () => {
    if (profile?.id)
      stompClient.subscribe(`/user/${profile.id}/private`, onMessageReceived);
  };

  const sendMessage = () => {
    const message: MessageRequest = {
      message: "Hello",
      type: "MESSAGE",
      token: "dasdasdad",
    };

    try {
      stompClient.send("/app/message", {}, JSON.stringify(message));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connect();
    return () => {
      if (stompClient.connected) {
        stompClient.disconnect(() => {});
      }
    };
  }, [profile?.id]);

  return (
    <>
      <div className="cartItemWrapper">
        <div
          className="cartItemMainPage"
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-around",
          }}
        >
          <PersonalCart pageId="home" />
          <PersonalCart pageId="home" />
          <PersonalCart pageId="home" />
        </div>
        <div className="buttonGroup">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            className="bi bi-arrow-left-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            className="bi bi-arrow-right-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
        </div>
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
};

export default HomePage;
