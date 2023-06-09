import "dotenv/config";
import "express-async-errors";

import express from "express";
import http from "http";
import { Server } from "socket.io";

import cors from "cors";

import createConnection from "@infra/mongoose";
import { routes } from "./routes";
import { errorHandling } from "./middlewares/handleErrors";
createConnection();

import socketHandler from "./socket.io/socket-handler";

const application = express();
const server = http.createServer(application);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

application.use(express.json());
application.use(
  cors({
    origin: "*",
  })
);

socketHandler();

application.use(routes);

application.use(errorHandling);

export { server, io };
