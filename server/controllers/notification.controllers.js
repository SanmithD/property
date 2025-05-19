import 'dotenv/config';
import jwt from 'jsonwebtoken';
import notificationModel from "../models/notification.model.js";
import propertyModel from "../models/property.model.js";

const JWT = process.env.JWT_SECRET;

const notification = async(name, roomId) =>{
    try {
        const response = await propertyModel.findById(roomId);
        if(!response){
            return res.status(404).json({
            success: false,
            message: "Room not found"
        });
        }
        const { title, owner } = response;
        const message = `${name} viewed your ${title} property `;
        const notification = new notificationModel({
            customerName: name,
            owner,
            message,
            property: roomId
        });
        return await notification.save();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error)
    }
}

const getNotification = async(req, res) =>{
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
            return res.status(404).json({
            success: false,
            message: "Id not found"
        });
        }
        const response = await notificationModel.find({ owner: id });
        if(!response){
            return res.status(404).json({
            success: false,
            message: "Not found"
        });
        }
        res.status(200).json({
            success: true,
            message: "Notification",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error)
    }
}

export { getNotification, notification };
