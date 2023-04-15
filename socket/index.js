import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { addUser, removeUser, getUser } from "./helper.js";

dotenv.config();
const httpServer = createServer();
const app = express();

app.use(cors({ origin: true, credentials: true }));

const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "PRODUCTION"
        ? process.env.PROD_URL
        : process.env.DEV_URL,
  },
});

// console.log(
//   "----",
//   process.env.NODE_ENV === "PRODUCTION"
//     ? process.env.PROD_URL
//     : process.env.DEV_URL
// );

// const io = require("socket.io")(8800, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

////// CONTAINS USER ID and SOCKET ID
let users = [];

io.on("connection", (socket) => {
  console.log("User connected.");

  /////ADDING THE CONNECTED USER
  //USER's ID IS RECIEVED FROM THE CLIENT
  socket.on("addUser", (userId) => {
    /////ADDING A CONNECTED USER TO THE USERS ARRAY
    //EVERY ENTRY IN USER ARRAY WILL HAVE THE USER's ID AND SOCKET ID
    users = addUser(users, userId, socket.id);

    /////SENDING CONNECTED USERS TO THE CLIENT
    io.emit("getUsers", users);
  });

  /////RECIEVING MESSAGE FROM CLIENT ALONG WITH THE SENDER's ID AND RECIEVER's ID
  socket.on("sendMessage", ({ senderId, recieverId, text }) => {
    /////USING RECIEVER's ID TO RETRIEVE THE SOCKET ID FROM USERS ARRAY
    const user = getUser(users, recieverId);
    /////SENDING THE MESSAGE ALONG WITH SENDER'S ID TO RECIEVER USING THE SOCKET ID
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");

    users = removeUser(users, socket.id);

    io.emit("getUsers", users);
  });
});

const __dirname = path.resolve("../");



if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  console.log(__dirname);
  app.get("/*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "main.js"))
  );
}

httpServer.listen(8800);
