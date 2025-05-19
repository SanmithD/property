import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    owner :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status: {
        type: String,
        enum: ['available', 'sold', 'rented'],
        default: 'available'
    },
    state: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    street:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: [ String],
    },
    bedroom: {
        type: Number,
        required: true
    },
    sqFt: {
        type: Number,
        required: true
    },
    bathroom:{
        type: String,
        required: true
    }
},{ timestamps: true });

const propertyModel = mongoose.model('property', propertySchema );

export default propertyModel;