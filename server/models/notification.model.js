import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    customerName:{
        type: String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    message:{
        type: String,
    },
    property:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property'
    }
},{ timestamps: true });

const notificationModel = mongoose.model('notification', notificationSchema );

export default notificationModel;