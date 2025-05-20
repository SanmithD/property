import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  userId: String,
  name: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const userMsgSchema = new mongoose.Schema({
  userId: String,     
  name: String,
  message: String,
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now },
});

const contactSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerMessages: [userMsgSchema],
}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);
