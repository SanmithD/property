import express from 'express';
import { getAllMsg, getOwnUserMsg, getReplies, getUserMsg, postMessage, postReply } from '../controllers/contact.controllers.js';

const contactRouter = express.Router();

contactRouter.post('/postMessage',  postMessage);
contactRouter.get('/getAllMsg', getAllMsg);
contactRouter.get('/getUserMsg/:id', getUserMsg);
contactRouter.get('/getOwnMsg', getOwnUserMsg);
contactRouter.post('/messages/:messageId/replies', postReply);
contactRouter.get('/messages/:messageId/replies', getReplies);

export default contactRouter;