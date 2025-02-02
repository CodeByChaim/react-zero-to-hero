import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/logout', (req, res) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.json({ message: 'Logged out successfully' });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Simulate user authentication (replace with real DB check)
  if (email === 'test@example.com' && password === 'password123') {
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    // Set HttpOnly Cookie
    res.cookie('authToken', token, {
      httpOnly: true, //  Prevents JavaScript access (XSS protection)
      secure: process.env.NODE_ENV === 'production', //  Ensures HTTPS in production
      sameSite: 'strict', //  Prevents CSRF attacks
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.json({ message: 'Login successful' });
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

export default router;
