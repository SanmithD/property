import 'dotenv/config';
import jwt from 'jsonwebtoken';
import propertyModel from '../models/property.model.js';
import userModel from '../models/user.model.js';
import { notification } from './notification.controllers.js';

const JWT = process.env.JWT_SECRET;

const addProperty = async(req, res) =>{
    const { title, description, owner, state, city, street, price, bedroom, sqFt, bathroom } = req.body;
    const image = req.file ? req.file.pathname : null;
    const token = req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(403).json({
            success: false,
            message: "Unauthorized"
        });
    }
    if(!title || !description || !state || !city || !street || !price || !bedroom || !sqFt || !bathroom ){
        return res.status(400).json({
            success: false,
            message: "Enter all details"
        });
    }
    try {
        //finding user
        const { id } = jwt.verify(token, JWT);
        if(!id){
            return res.status(404).json({
            success: false,
            message: "User id not found"
        });
        } 
        const propertyDetails = new propertyModel({
            title,
            image, 
            description, 
            owner : id , 
            state, 
            city, 
            street, 
            price, 
            bedroom, 
            sqFt, 
            bathroom 
        });
        if(!propertyDetails){
            return res.status(400).json({
            success: false,
            message: "Unable to post room"
        });
        }
        await propertyDetails.save();
        res.status(201).json({
            success: true,
            message: "New Property added",
            propertyDetails
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

const getAllRooms = async(req, res) =>{
    try {
        const response = await propertyModel.find();
        if(!response){
            return res.status(400).json({
            success: false,
            message: "Not found"
        });
        }
        res.status(200).json({
            success: true,
            message: "All Rooms",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

const getRoomById = async(req, res) =>{
    const { roomId } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(403).json({
            success: false,
            message: "Unauthorized"
        });
    }
    try {
        const { id } = jwt.verify(token, JWT);
        if(!id){
            return res.status(400).json({
            success: false,
            message: "id not found"
        });
        }
        const { name } = await userModel.findById(id);
        const response = await propertyModel.findById(roomId);
        if(!response){
            return res.status(404).json({
            success: false,
            message: "Room not found"
        });
        }
        notification(name, roomId);
        res.status(200).json({
            success: true,
            message: "Room",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

export { addProperty, getAllRooms, getRoomById };
