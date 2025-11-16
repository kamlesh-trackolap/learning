import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL!;
    const conn = await mongoose.connect(mongoUrl, {
        dbName:'app20'
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error:any) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
export default connectDB;
