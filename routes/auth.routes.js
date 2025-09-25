import { Router } from 'express';

const authRouter = Router();

// Use res.json to send JSON data
authRouter.post('/sign-up', (req, res) => res.json({ title: 'Sign Up' }));
authRouter.post('/sign-in', (req, res) => res.json({ title: 'Sign In' }));
authRouter.post('/sign-out', (req, res) => res.json({ title: 'Sign Out' }));

export default authRouter;
