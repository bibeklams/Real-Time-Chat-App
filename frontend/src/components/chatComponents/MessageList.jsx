import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMessages } from "../../services/messageService";
import { setMessages } from "../../redux/chatSlice";
import MessageBubble from "./MessageBubble";

function MessageList() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { selectedUser, messages } = useSelector((state) => state.chat);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!selectedUser) return;

        const res = await getMessages(selectedUser._id);

        dispatch(setMessages(res.messages));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [selectedUser, dispatch]);

  if (!selectedUser) {
    return null;
  }

  return (
    <div className="p-4 flex flex-col gap-2">
      {messages.map((msg) => (
        <MessageBubble
          key={msg._id}
          message={msg}
          isOwnMessage={
            msg.sender?._id
              ? msg.sender._id === user._id
              : msg.sender === user._id
          }
        />
      ))}
    </div>
  );
}

export default MessageList;
