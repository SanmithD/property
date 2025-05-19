import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    room:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property'
    },
    message:[{
        question:{
            type: String
        },
        answer: {
            type: String
        }
    }]
},{ timestamps: true });

const contactModel = mongoose.model('contact', contactSchema);

export default contactModel;