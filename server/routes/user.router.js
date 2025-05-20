import express from 'express';
import { loginSchema, signupSchema } from '../config/user.config.js';
import { login, ownerProperties, profile, signup, user } from '../controllers/user.controllers.js';

const userRouter = express.Router();

userRouter.post('/signup', signupSchema, signup );
userRouter.post('/login', loginSchema, login );
userRouter.get('/profile', profile );
userRouter.get('/user/:userId', user );
userRouter.get('/owner', ownerProperties );

export default userRouter;