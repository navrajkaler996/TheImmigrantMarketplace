import path from "path";
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

const __dirname = path.resolve();

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  console.log("nnnnn");
  app.get("/*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "main.js"))
  );
}

const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(`Server running in ${ENV} on Port: ${PORT} `);
});
