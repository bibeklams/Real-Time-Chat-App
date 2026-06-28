import React from "react";
import { useSelector } from "react-redux";

import MessageInput from "../components/chatComponents/MessageInput";
import MessageList from "../components/chatComponents/MessageList";
import Sidebar from "../components/chatComponents/Sidebar";
import ChatHeader from "../components/chatComponents/ChatHeader";

function Chat() {
  const { selectedUser } = useSelector((state) => state.chat);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <ChatHeader />

            <div className="flex-1 overflow-y-auto">
              <MessageList />
            </div>

            <MessageInput />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-gray-500">
              Select a user to start chatting
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
