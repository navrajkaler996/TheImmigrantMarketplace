import mongoose from "mongoose";
import dotenv from "dotenv";
const connectDB = async () => {
  dotenv.config();
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
    });

    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
