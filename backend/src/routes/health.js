import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/health', (_req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const state = states[mongoose.connection.readyState] || String(mongoose.connection.readyState);
  res.json({
    status: 'ok',
    ts: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
    db: { state }
  });
});

export default router;
