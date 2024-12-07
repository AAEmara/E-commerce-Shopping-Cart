import mongoose from 'mongoose';

async function connectDB() {
  const dbURI = process.env.MONGO_URI;

  try {
    const conn = await mongoose.connect(dbURI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch(error) {
    console.error('MongoDB connection failed:', error);
  }
}

export default connectDB;
