import { io } from "@infra/app";

io.on("connection", (socket) => {
  console.log(socket);
  socket.broadcast.emit("user-connected", {
    userID: socket.id,
  });
});
