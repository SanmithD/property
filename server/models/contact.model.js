import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    customer:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    message:{
      type: String,
      required: true
    },
    createdAt:{
      type: Date,
      default: Date.now()
    }
},{ timestamps: true });

export const contactModel = mongoose.model('contact', contactSchema);