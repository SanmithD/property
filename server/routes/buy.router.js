import express from 'express';
import { buyRoom, cancelRoom, ownerDecision } from '../controllers/buy.controllers.js';

const buyRouter = express.Router();

buyRouter.post('/:id',   buyRoom);        
buyRouter.patch('/:buyId', ownerDecision); 
buyRouter.put('/cancel/:propertyId', cancelRoom); 

export default buyRouter;
