import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDb from "./config/db.js";
import { initSocket } from "./services/socketService.js";

const PORT = process.env.PORT || 3000;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

connectDb();

initSocket(io);

server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
