import express from 'express';
import upload from '../config/cloud.config.js';
import { addProperty, getAllRooms, getRoomById } from '../controllers/property.controllers.js';

const propertyRouter = express.Router();

propertyRouter.post('/add', upload.single('image'), addProperty );
propertyRouter.get('/properties', getAllRooms );
propertyRouter.get('/room/:roomId', getRoomById );

export default propertyRouter;