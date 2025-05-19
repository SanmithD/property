import 'dotenv/config';
import jwt from 'jsonwebtoken';
import contactModel from '../models/contact.model.js';
import userModel from '../models/user.model.js';

const JWT = process.env.JWT_SECRET;

const postMessage = async (req, res) => {
  const { message } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ success: false, message: "Unauthorized access" });
  }

  try {
    if (!message) {
      return res.status(400).json({ success: false, message: "Please enter a message" });
    }

    const { id } = jwt.verify(token, JWT);
    if (!id) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const { name } = await userModel.findById(id);

    const data = {
      userMsg: [{
        userId: id,
        name,
        contactImage,
        message,
        replies: [],
      }],
    };

    const newMessage = await contactModel.create(data);
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Post message error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const postReply = async (req, res) => {
  const { messageId } = req.params;
  const { message } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ success: false, message: "Unauthorized access" });
  }

  try {
    if (!message) {
      return res.status(400).json({ success: false, message: "Please enter a reply message" });
    }

    const { id, name } = jwt.verify(token, JWT);
    if (!id) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const contact = await contactModel.findById(messageId);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    const reply = {
      userId: id,
      name,
      message,
      replyImage,
    };

    contact.userMsg[0].replies.push(reply);
    await contact.save();

    res.status(201).json({
      success: true,
      message: "Reply added successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Post reply error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getReplies = async (req, res) => {
  const { messageId } = req.params;

  try {
    const contact = await contactModel.findById(messageId);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    res.status(200).json({
      success: true,
      message: "Replies retrieved successfully",
      data: contact, // Return full message with replies
    });
  } catch (error) {
    console.error("Get replies error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllMsg = async (req, res) => {
  try {
    const allMsg = await contactModel.find();
    if (!allMsg.length) {
      return res.status(404).json({ success: false, message: "No messages found" });
    }

    res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      data: allMsg,
    });
  } catch (error) {
    console.error("Get all messages error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getUserMsg = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const userMsg = await contactModel.find({ "userMsg.userId": id });
    if (!userMsg.length) {
      return res.status(404).json({ success: false, message: "No messages found for this user" });
    }

    res.status(200).json({
      success: true,
      message: "User messages retrieved successfully",
      data: userMsg,
    });
  } catch (error) {
    console.error("Get user messages error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getOwnUserMsg = async(req, res) =>{
  const token = req.headers.authorization?.split(" ")[1];

  if(!token){
    return res.status(403).json({
      success: false,
      message: "Unauthorized access"
    });
  }
  try {
    const { id } = jwt.verify(token, JWT);
    const response = await contactModel.find({ "userMsg.userId" : id });
    console.log(response);
    if(!response){
      return res.status(404).json({
        success: false,
        message: "Messages not found"
      })
    };
    res.status(200).json({
      success: true,
      message: "User messages",
      response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
}

export { getAllMsg, getOwnUserMsg, getReplies, getUserMsg, postMessage, postReply };

