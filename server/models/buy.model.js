import mongoose from 'mongoose';

const buySchema = new mongoose.Schema(
  {
    customer: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true 
    },
    owner   : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    property: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'property', 
        required: true 
    },
    status   : { 
        type: String, 
        enum: ['pending','accepted','rejected'], 
        default: 'pending' 
    }
  },
  { timestamps: true }
);

export default mongoose.model('buy', buySchema);
