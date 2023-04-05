import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import itemRouter from "./routes/itemRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is listening at Port: 4000");
});
