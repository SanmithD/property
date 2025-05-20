import jwt from "jsonwebtoken";
import Contact from "../models/contact.model.js";
import User from "../models/user.model.js";
const JWT_SECRET = process.env.JWT_SECRET;

export const customerMessageOwner = async (req, res) => {
  const { ownerId } = req.params;
  const { message } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ 
    success : false,
    message: "Unauthorized" 
  });

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user || user.role !== "customer")
      return res.status(403).json({ 
    success: false,
    message: "Access denied" 
  });

    let chat = await Contact.findOne({ ownerId });

    const newMessage = {
      userId: id,
      name: user.name,
      message,
      replies: [],
    };

    if (!chat) {
      chat = await Contact.create({
        ownerId,
        customerMessages: [newMessage],
      });
    } else {
      chat.customerMessages.push(newMessage);
      await chat.save();
    }

    res.status(201).json({ message: "Message sent", data: chat });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 📥 OWNER GETS ALL CHATS SENT TO THEM
export const getOwnerChats = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user || user.role !== "owner")
      return res.status(403).json({ message: "Access denied" });

    const chats = await Contact.find({ ownerId: id });
    res.status(200).json({ chats });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 💬 OWNER GETS CHAT WITH SPECIFIC CUSTOMER
export const getChatWithCustomer = async (req, res) => {
  const { customerId } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    const chat = await Contact.findOne({
      ownerId: id,
      "customerMessages.userId": customerId,
    });

    if (!chat)
      return res.status(404).json({ message: "No chat with this customer" });

    const customerChat = chat.customerMessages.filter(
      (msg) => msg.userId === customerId
    );

    res.status(200).json({ chat: customerChat });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔁 OWNER REPLIES TO A CUSTOMER MESSAGE
export const replyToCustomer = async (req, res) => {
  const { messageId } = req.params;
  const { message } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || user.role !== "owner")
      return res.status(403).json({ message: "Access denied" });

    const contact = await Contact.findOne({ "customerMessages._id": messageId });
    if (!contact) return res.status(404).json({ message: "Message not found" });

    const msg = contact.customerMessages.id(messageId);
    msg.replies.push({
      userId: id,
      name: user.name,
      message,
    });

    await contact.save();
    res.status(200).json({ message: "Reply added", chat: contact });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
