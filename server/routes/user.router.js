import express from 'express';
import { loginSchema, signupSchema } from '../config/user.config.js';
import { login, profile, signup } from '../controllers/user.controllers.js';

const userRouter = express.Router();

userRouter.post('/signup', signupSchema, signup );
userRouter.post('/login', loginSchema, login );
userRouter.get('/profile', profile );

export default userRouter;