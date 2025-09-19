import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDB() {
  try {
    await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      dbName: env.DB_NAME,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.warn('MongoDB connection failed (continuing without DB):', err.message);
  }
}
