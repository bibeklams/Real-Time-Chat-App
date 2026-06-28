import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { socket } from "./socket/socket";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import ProtectedRoute from "./routes/ProtectedRoute";

import { profile } from "./services/authService";
import { loginSuccess, logout } from "./redux/authSlice";
import { addMessage, setOnlineUsers } from "./redux/chatSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await profile();

        dispatch(
          loginSuccess({
            user: res.user,
          }),
        );

        socket.connect();

        socket.emit("join", res.user._id);

        socket.on("newMessage", (message) => {
          console.log("Socket received:", message);

          dispatch(addMessage(message));
        });

        socket.on("onlineUsers", (users) => {
          console.log("Online Users:", users);

          dispatch(setOnlineUsers(users));
        });
      } catch (error) {
        socket.disconnect();
        dispatch(logout());
      }
    };

    checkAuth();

    return () => {
      socket.off("newMessage");
      socket.off("onlineUsers");
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
