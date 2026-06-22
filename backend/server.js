import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDb from "./config/db.js";
import socketService from "./services/socketService.js";
const port = process.env.PORT || 3000;
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"],
  },
});

connectDb();

socketService(io);

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
