import jwt from "jsonwebtoken";
import { io } from "@infra/app";

import config from "@config/auth";

export default function socketHandler() {
  const users: any[] = [];

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (token) {
      jwt.verify(token, config.secret_token, (err: any, decoded: any) => {
        if (err) return next(new Error("Authentication error"));
        socket.data.user = decoded;
        next();
      });
    }
  });

  io.on("connection", (socket) => {
    socket.broadcast.emit("user-connected", {
      user_id: socket.id,
    });

    console.log(socket.data);

    users.push(socket.data);
    socket.emit("users", users);
  });
}
