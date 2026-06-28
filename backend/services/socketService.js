let io;

const onlineUsers = {};

export const initSocket = (socketIO) => {
  io = socketIO;

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("join", (userId) => {
      onlineUsers[userId] = socket.id;

      // Send updated online users to everyone
      io.emit("onlineUsers", Object.keys(onlineUsers));

      console.log("Online Users:", onlineUsers);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);

      for (const userId in onlineUsers) {
        if (onlineUsers[userId] === socket.id) {
          delete onlineUsers[userId];
          break;
        }
      }

      // Send updated online users to everyone
      io.emit("onlineUsers", Object.keys(onlineUsers));

      console.log("Online Users:", onlineUsers);
    });
  });
};

export const getIO = () => io;

export const getOnlineUsers = () => onlineUsers;
