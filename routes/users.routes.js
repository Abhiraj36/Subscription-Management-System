

import { Router } from 'express';
import authorize from '../middlewares/auth.middlware.js';
import { getUser, getUsers } from "../controllers/user.controller.js"

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);
  

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
