import express from 'express';
import { buyRoom, ownerDecision } from '../controllers/buy.controllers.js';

const buyRouter = express.Router();

buyRouter.post('/:id',   buyRoom);        
buyRouter.patch('/:buyId', ownerDecision); 

export default buyRouter;
