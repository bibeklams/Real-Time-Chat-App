import React from "react";

function MessageBubble({ message, isOwnMessage }) {
  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isOwnMessage ? "bg-blue-500 text-white" : "bg-white border"
        }`}
      >
        <p>{message.message}</p>

        <p className="text-xs mt-1 opacity-70 text-right">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

export default MessageBubble;
