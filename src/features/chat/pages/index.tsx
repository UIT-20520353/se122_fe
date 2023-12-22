import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { MdOutlineMoreHoriz, MdArrowBack } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

interface ChatProps {
  isOpen: boolean;
  closeModal: () => void;
}

const Chat: React.FunctionComponent<ChatProps> = ({ isOpen, closeModal }) => {
  const divContentRef = useRef<HTMLDivElement>(null);

  const [isShowChatbox, setIsShowChatbox] = useState<boolean>(false);

  const onCLickOutside = () => {
    setIsShowChatbox(false);
    closeModal();
  };

  useOnClickOutside(divContentRef, onCLickOutside);

  return (
    <div className={`chat-page ${isOpen ? "show" : ""}`}>
      <div className="content" ref={divContentRef}>
        <div className="content__header">
          <h3>Chat</h3>
        </div>
        {isShowChatbox ? (
          <div className="chatbox">
            <div className="chatbox__header">
              <MdArrowBack
                className="icon"
                onClick={() => setIsShowChatbox(false)}
              />
              <span className="name">Nam Do</span>
              <MdOutlineMoreHoriz className="icon" />
            </div>
            <div className="chatbox__content"></div>
            <div className="chatbox__footer">
              <input
                type="text"
                placeholder="Aa"
                id="input-message"
                className="input-message"
              />
              <button className="btn-send" type="button">
                <IoMdSend className="icon" />
              </button>
            </div>
          </div>
        ) : (
          <div className="content__list-user">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div
                key={`row-user-${item}`}
                className="user"
                onClick={() => setIsShowChatbox(true)}
              >
                <img
                  className="user__avatar"
                  src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg"
                  alt="user avatar"
                />
                <span className="user__name">Nam Do</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
