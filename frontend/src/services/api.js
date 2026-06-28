import axios from "axios";

export const api = axios.create({
  baseURL: "https://real-time-chat-app-7al6.onrender.com/api",
  withCredentials: true,
});
