const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../models/User");

const registerUser = async (req,res) =>{
    try{
        const {name, email, password }=req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        const existingUser =await User.findOne({ email });
        if(existingUser){
             return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }
        const hashedpassword= await bcrypt.hash(password,10);

        const user= await User.create({
            name,
            email,
            password:hashedpassword
        });
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                token
            }
        });
    }
    catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    registerUser
};