import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { setSelectedUser } from "../../redux/chatSlice";
import { getAllUsers } from "../../services/userService";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { onlineUsers } = useSelector((state) => state.chat);

  useEffect(() => {
    const userList = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.users);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    userList();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="text-gray-500">Loading users...</h1>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="text-gray-500">No users found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-3">
      {users.map((u) => {
        const isOnline = onlineUsers.includes(u._id);

        return (
          <div
            key={u._id}
            onClick={() => dispatch(setSelectedUser(u))}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
          >
            <img
              src={u.imageUrl || "/default-avatar.png"}
              alt={u.name}
              className="w-12 h-12 rounded-full object-cover border"
            />

            <div>
              <h3 className="font-semibold text-gray-800">{u.name}</h3>

              <p
                className={`text-sm ${
                  isOnline ? "text-green-500" : "text-gray-500"
                }`}
              >
                {isOnline ? "🟢 Online" : "⚫ Offline"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserList;
