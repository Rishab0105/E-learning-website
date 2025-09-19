import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  // Placeholder auth; replace with real user lookup + password check
  return res.json({ ok: true, user: { email }, token: 'demo-token' });
});

export default router;
