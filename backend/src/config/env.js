import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 3000),
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/skillsync',
  DB_NAME: process.env.DB_NAME || 'skillsync',
  // Comma-separated list of allowed origins (e.g., "http://127.0.0.1:5500,http://localhost:5500")
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  CORS_ORIGINS: (process.env.CORS_ORIGIN || '*')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0),
};
