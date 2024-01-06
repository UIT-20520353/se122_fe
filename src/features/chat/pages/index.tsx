import React, { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import ChatBox from "../components/ChatBox";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { selectUserId, setLoading } from "../../../redux/globalSlice";
import chatroomApi from "../../../api/chatroomApi";
import { ChatRoomModel } from "../../../models/chatroom";
import { UserModel } from "../../../models/user";

interface ChatProps {
  isOpen: boolean;
  closeModal: () => void;
}

interface SelectedRowProps {
  user: UserModel;
  chatroomId: number;
}

const Chat: React.FunctionComponent<ChatProps> = ({ isOpen, closeModal }) => {
  const dispatch = useAppDispatch();
  const handleResponseError = useHandleResponseError();
  const userId = useAppSelector(selectUserId);

  const divContentRef = useRef<HTMLDivElement>(null);
  const [chatrooms, setChatrooms] = useState<ChatRoomModel[]>([]);
  const [selectedRow, setSelectedRow] = useState<SelectedRowProps | null>(null);

  const onCLickOutside = () => {
    setSelectedRow(null);
    closeModal();
  };

  useOnClickOutside(divContentRef, onCLickOutside);

  const fetchData = async () => {
    dispatch(setLoading("ADD"));
    const { ok, body, error } = await chatroomApi.getChatrooms({
      "userId.equals": userId || null,
    });
    dispatch(setLoading("REMOVE"));

    if (ok && body) {
      setChatrooms(body);
    }

    handleResponseError(error);
  };

  useEffect(() => {
    if (isOpen) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div className={`chat-page ${isOpen ? "show" : ""}`}>
      <div className="content" ref={divContentRef}>
        <div className="content__header">
          <h3>Chat</h3>
        </div>
        {selectedRow ? (
          <ChatBox
            chatroomId={selectedRow.chatroomId}
            user={selectedRow.user}
            onCloseChatBox={() => setSelectedRow(null)}
          />
        ) : (
          <div className="content__list-user">
            {chatrooms.map((c) => (
              <div
                key={`row-user-${c.id}`}
                className="user"
                onClick={() =>
                  setSelectedRow({
                    user: c.user,
                    chatroomId: c.id,
                  })
                }
              >
                <img
                  className="user__avatar"
                  src={c.user.avatar}
                  alt="user avatar"
                />
                <span className="user__name">{`${c.user.firstName} ${c.user.lastName}`}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
