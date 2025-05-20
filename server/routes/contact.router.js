import express from 'express';
import { customerMessageOwner, getChatWithCustomer, getOwnerChats, replyToCustomer } from '../controllers/contact.controllers.js';

const contactRouter = express.Router();

contactRouter.post("/message/:ownerId", customerMessageOwner);
contactRouter.get("/owner/chats", getOwnerChats);
contactRouter.get("/owner/chat/:customerId", getChatWithCustomer);
contactRouter.post("/reply/:messageId", replyToCustomer);

export default contactRouter;