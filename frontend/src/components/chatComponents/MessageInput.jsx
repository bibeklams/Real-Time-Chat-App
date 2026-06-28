import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addMessage } from "../../redux/chatSlice";
import { sendMessage } from "../../services/messageService";

function MessageInput() {
  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state) => state.chat);

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser || !message.trim()) return;

    try {
      const res = await sendMessage(selectedUser._id, message);

      dispatch(addMessage(res.data));

      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white flex gap-2">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border rounded-lg px-4 py-2"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Send
      </button>
    </form>
  );
}

export default MessageInput;
