import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouters from "./routes/userRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

app.use("/api/user", userRouters);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is listening at Port: 4000");
});
