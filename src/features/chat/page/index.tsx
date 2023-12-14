import React, { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface ChatProps {}

const Chat: React.FunctionComponent<ChatProps> = () => {
  // const { readyState } = useWebSocket("ws://localhost:8080/chat", {
  //   onOpen: () => console.log("opened"),
  // });

  // useEffect(() => {
  //   console.log("Open: ", readyState === ReadyState.OPEN);
  //   console.log("Closed: ", readyState === ReadyState.CLOSED);
  //   console.log("Closing: ", readyState === ReadyState.CLOSING);
  //   console.log("Connecting: ", readyState === ReadyState.CONNECTING);
  //   console.log("UNINSTANTIATED: ", readyState === ReadyState.UNINSTANTIATED);
  // }, [readyState]);
  const socket = new WebSocket("ws://localhost:8080/chat");
  socket.onopen = () => console.log("WebSocket connection established");
  socket.onerror = (error) => console.log("WebSocket error:", error);

  return <div>Chat</div>;
};

export default Chat;
