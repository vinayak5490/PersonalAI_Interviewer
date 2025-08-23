import User from "../models/User.Model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({message : "User already exist"});

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password:hashedPassword});
        await user.save();

        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '1d'});
        res.status(201).json({token, user: {id: user._id, name, email}});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const login = async(req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: 'Invalid credentials'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message:'Invalid credentials'});

        const token = jwt.sign({id:user._id}, JWT_SECRET, {expiresIn: '1d'});
        res.json({token, user: {id: user._id, name: user.name, email}});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};
