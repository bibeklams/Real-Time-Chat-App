import React from "react";
import { useSelector } from "react-redux";

function ChatHeader() {
  const { selectedUser, onlineUsers } = useSelector((state) => state.chat);

  const isOnline = onlineUsers.includes(selectedUser?._id);

  if (!selectedUser) return null;

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center gap-3">
        <img
          src={selectedUser.imageUrl || "/default-avatar.png"}
          alt={selectedUser.name}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h2 className="font-semibold text-lg">{selectedUser.name}</h2>

          <p
            className={`text-sm ${
              selectedUser.status === "online"
                ? "text-green-500"
                : "text-gray-500"
            }`}
          >
            {selectedUser.status === "online" ? "🟢 Online" : "⚫ Offline"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
