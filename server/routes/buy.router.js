import express from 'express';
import { buyRoom, cancelRoom, getOwnerRequests, ownerDecision } from '../controllers/buy.controllers.js';

const buyRouter = express.Router();

buyRouter.post('/:id',   buyRoom);        
buyRouter.patch('/:buyId', ownerDecision); 
buyRouter.get("/owner/requests", getOwnerRequests);
buyRouter.put('/cancel/:id', cancelRoom); 

export default buyRouter;
