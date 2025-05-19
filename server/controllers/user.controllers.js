import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from 'jsonwebtoken';
import userModel from "../models/user.model.js";

const JWT = process.env.JWT_SECRET;

const signup = async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({
      success: false,
      message: "Fill all the details",
    });
  }
  try {
    //user checking
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exits",
      });
    }

    //hashing password
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      phone,
      password: hashPassword,
      role,
    });

    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "Unable to signup",
      });
    }
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Signup success",
      newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

const login = async(req, res) =>{
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Fill all the details"
        });
    }
    try {
        //checking user 
        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(400).json({
            success: false,
            message: "User does not exists"
        });
        }

        //comparing password
        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword){
            return res.status(400).json({
            success: false,
            message: "Incorrect details"
        });
        }
        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT,
            { expiresIn: '24h' }
        );
        
        //login success
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            name: user.name,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

const profile = async(req, res) =>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(403).json({
            success: false,
            message: "Unauthorized"
        });
    }
    try {
        //fetching logged user
        const { id } = jwt.verify(token, JWT);
        if(!id){
            return res.status(400).json({
            success: false,
            message: "Id not found"
        });
        }
        const user = await userModel.findById(id);
        if(!user){
            return res.status(400).json({
            success: false,
            message: "User not found"
        });
        }
        res.status(200).json({
            success: true,
            message: "Profile",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error)
    }
}

export { login, profile, signup };

