import { io } from "socket.io-client";

export const socket = io("https://real-time-chat-app-7al6.onrender.com", {
  autoConnect: false,
  withCredentials: true,
});
