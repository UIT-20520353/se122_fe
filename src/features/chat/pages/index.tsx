import React, { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface ChatProps {
  isOpen: boolean;
  closeModal: () => void;
}

const Chat: React.FunctionComponent<ChatProps> = ({ isOpen, closeModal }) => {
  const divContentRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(divContentRef, closeModal);

  return (
    <div className={`chat-page ${isOpen ? "show" : ""}`}>
      <div className="content" ref={divContentRef}>
        <div className="content__header">
          <h3>Chat</h3>
        </div>
        <div className="content__list-user">
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
          <div>dasdsad</div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
