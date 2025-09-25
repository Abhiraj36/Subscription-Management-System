//C:\Users\abhir_56d9u3c\Desktop\Subscription-Management-System\routes\users.routes.js

import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.json({ title: 'Get all user' });
});

userRouter.get('/:id', (req, res) => {
  res.json({ title: 'Get all user details' });
});

userRouter.post('/', (req, res) => {
  res.json({ title: 'Create new user' });
});

userRouter.put('/:id', (req, res) => {
  res.json({ title: 'Update user' });
});

userRouter.delete('/:id', (req, res) => {
  res.json({ title: 'Delete user' });
});

export default userRouter;
