import React from "react";
import UserList from "./UserList";
import { useDispatch } from "react-redux";
import { logoutApi } from "../../services/authService";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <aside className="w-80 h-screen bg-white border-r flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-slate-800">Chat App</h1>
      </div>

      {/* Search */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        <UserList />
      </div>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
