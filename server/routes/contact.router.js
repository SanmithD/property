import express from 'express';
import { getAllOwnerMsg, getAllUserMsg, getMsg, getUserMsg } from '../controllers/contact.controllers.js';

const contactRouter = express.Router();

contactRouter.get("/ownerMsg", getAllOwnerMsg);
contactRouter.get("/customer", getAllUserMsg);
contactRouter.get("/chats/:ownerId", getMsg);
contactRouter.get("/user-chats/:customer", getUserMsg);

export default contactRouter;