import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['customer','admin'],
        default: 'customer'
    },
    email:{
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
},{ timestamps: true });

const userModel = mongoose.model('user',userSchema);

export default userModel