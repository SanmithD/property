import "dotenv/config";
import jwt from "jsonwebtoken";
import buyModel from "../models/buy.model.js";
import propertyModel from "../models/property.model.js";

const JWT = process.env.JWT_SECRET;

export const buyRoom = async (req, res) => {
  const propertyId = req.params.id;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });

  try {
    const { id: customerId } = jwt.verify(token, JWT);

    const property = await propertyModel.findById(propertyId).populate("owner");
    if (!property || property.status !== "available")
      return res.status(400).json({
        success: false,
        message: "Property not available",
      });

    const exists = await buyModel.findOne({
      property: propertyId,
      status: "pending",
    });
    if (exists)
      return res.status(409).json({
        success: false,
        message: "waiting owner decision",
      });

    const order = await buyModel.create({
      customer: customerId,
      owner: property.owner._id,
      property: propertyId,
    });

    return res.status(201).json({
      success: true,
      message: "Request sent. Waiting for owner approval.",
      orderId: order._id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const ownerDecision = async (req, res) => {
  const { buyId } = req.params;
  const { action } = req.query;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

  if (!["accept", "reject"].includes(action))
    return res.status(400).json({
      success: false,
      message: "Invalid action",
    });

  try {
    const { id: ownerId } = jwt.verify(token, JWT);

    const order = await buyModel.findOne({
      _id: buyId,
      owner: ownerId,
      status: "pending",
    });
    if (!order)
      return res.status(404).json({
        success: false,
        message: "Pending order not found",
      });

    if (action === "accept") {
      order.status = "accepted";
      await order.save();

      await propertyModel.findByIdAndUpdate(order.property, { status: "sold" },{ new: true });

      return res.json({
        success: true,
        message: "Order accepted & property sold",
      });
    }

    order.status = "rejected";
    await order.save();

    return res.json({
      success: true,
      message: "Order rejected",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const cancelRoom = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid property",
    });
  }
  try {
    const response = await propertyModel.findByIdAndUpdate(
      id,
      { status: "available" },
      { new: true }
    );
    if (!response) {
      return res.status(400).json({
        success: false,
        message: "Unable to cancel property",
      });
    }
    res.status(200).json({
      success: true,
      message: "Room Canceled",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

export const getOwnerRequests = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ 
  success: false, 
  message: "Unauthorized" 
});

  try {
    const { id: ownerId } = jwt.verify(token, JWT);

    const requests = await buyModel
      .find({ owner: ownerId, status: "pending" })
      .populate("property", "title")
      .populate("customer", "name");

    const formatted = requests.map((req) => ({
      _id: req._id,
      customerName: req.customer.name,
      propertyTitle: req.property.title,
      createdAt: req.createdAt,
    }));

    res.status(200).json({ 
      success: true, 
      response: formatted 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};
