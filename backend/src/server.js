import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import healthRouter from './routes/health.js';
import authRouter from './routes/auth.js';

const app = express();

// Allow multiple origins, including 127.0.0.1 and localhost during dev
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // mobile apps, curl, etc.
    if (env.CORS_ORIGIN === '*' || env.CORS_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', healthRouter);
app.use('/api/auth', authRouter);

app.get('/', (_req, res) => {
  res.send('Backend is running. Visit /api/health');
});

const server = app.listen(env.PORT, async () => {
  console.log(`API listening on http://localhost:${env.PORT}`);
  await connectDB();
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
