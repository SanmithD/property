import express from 'express';
import { getNotification } from '../controllers/notification.controllers.js';

const notificationRouter = express.Router();

notificationRouter.get('/getNotification', getNotification);

export default notificationRouter;
