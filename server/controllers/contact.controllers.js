import "dotenv/config";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import { contactModel } from "../models/contact.model.js";

const JWT = process.env.JWT_SECRET;

const contactController = async (io) => {
  io.on('connect', socket => {
    socket.on('sendMessage', async({ message, ownerId, token })=>{
      try {
        const { id } = jwt.verify(token, JWT);
        console.log(id);
        const response = new contactModel({
          ownerId,
          message,
          customer: id
        });
        await response.save();
      } catch (error) {
        console.log(error);
      }
      io.emit('receive', {message, ownerId, token});
    });
  });
};

const getAllOwnerMsg = async(req, res) =>{
  const token = req.headers.authorization.split(" ")[1];
  if(!token){
    return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
  }
  try {
    const { id } = jwt.verify(token, JWT);
    const response = await contactModel.find({ ownerId: id }).sort({ timestamp : 1 });
    if(!response){
      return res.status(400).json({
          success: false,
          message: "No messages yet",
        });
    }
    res.status(200).json({
          success: true,
          message: "All Messages",
          response
        });
  } catch (error) {
    res.status(500).json({
          success: false,
          message: "Server error",
        });
        console.log(error)
  }
}


const getAllUserMsg = async(req, res) =>{
  const token = req.headers.authorization.split(" ")[1];
  if(!token){
    return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
  }
  try {
    const { id } = jwt.verify(token, JWT);
    const response = await contactModel.find({ customerId: id }).sort({ timestamp : 1 });
    if(!response){
      return res.status(400).json({
          success: false,
          message: "No messages yet",
        });
    }
    res.status(200).json({
          success: true,
          message: "All Messages",
          response
        });
  } catch (error) {
    res.status(500).json({
          success: false,
          message: "Server error",
        });
        console.log(error)
  }
}


const getMsg = async (req, res) => {
  const { ownerId } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (!ownerId || !mongoose.Types.ObjectId.isValid(ownerId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ownerId",
    });
  }

  try {
    const { id } = jwt.verify(token, JWT);
    const response = await contactModel
      .find({ customer: id, ownerId })
      .sort({ createdAt: 1 });

    if (!response.length) {
      return res.status(404).json({
        success: false,
        message: "No messages yet",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All messages",
      response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getUserMsg = async(req, res) =>{
  const { customer } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  if(!token){
    return res.status(403).json({
      success: false,
      message: "Unauthorized"
    });
  };
  try {
    const { id } = jwt.verify(token, JWT);
    if(!id){
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    };
    const response = await contactModel.find({ ownerId: id, customer }).sort({ createdAt: 1 });
    if(!response){
      return res.status(400).json({
        success: false,
        message: "No message yet"
      });
    };
    res.status(200).json({
        success: true,
        message: "All messages",
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

export { contactController, getAllOwnerMsg, getAllUserMsg, getMsg, getUserMsg };

