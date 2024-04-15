import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    console.log("mongodb connected successfully");
  } catch (error) {
    console.log("mongodb connection error", error);
  }
};

export default connectMongo;
