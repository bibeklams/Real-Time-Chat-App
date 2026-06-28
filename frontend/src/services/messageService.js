import { api } from "./api";

export const sendMessage = async (receiverId, message) => {
  const response = await api.post(`/messages/${receiverId}`, { message });
  return response.data;
};
export const getMessages = async (receiverId) => {
  const response = await api.get(`/messages/${receiverId}`);
  return response.data;
};
export const isSeen = async (receiverId) => {
  const response = await api.patch(`/messages/${receiverId}/seen`);
  return response.data;
};
