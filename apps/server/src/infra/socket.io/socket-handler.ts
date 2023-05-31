import jwt from "jsonwebtoken";
import { io } from "@infra/app";

import config from "@config/auth";
import { IUser } from "./sessionStore";

export default function socketHandler() {
  const users: IUser[] = [];

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
    const { id, cpf } = socket.data.user;

    users.forEach((user) => {
      if (user.id === id) {
        user.connected = true;
      }
    });

    socket.join(id);

    const userAlreadyExists = users.find(
      (user) => user.id == id && user.cpf == cpf
    );

    if (!userAlreadyExists) {
      users.push({
        id: id,
        connected: true,
        cpf,
      });
    }

    socket.broadcast.emit("user-connected", {
      id: id,
      connected: true,
      cpf,
    });

    socket.emit("users", users);

    socket.on("private-message", ({ content, from, to }) => {
      const message = {
        content,
        from,
        to,
      };
      socket.to(to).to(from).emit("private-message", message);
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("user-disconnected", id);

      users.forEach((user) => {
        if (user.id === id) {
          user.connected = false;
        }
      });
    });
  });
}
