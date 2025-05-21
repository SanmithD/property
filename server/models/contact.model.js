import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      message: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true });

export const contactModel = mongoose.model('contact', contactSchema);

