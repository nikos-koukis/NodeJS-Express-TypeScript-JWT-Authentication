require('dotenv').config();
import { Request, Response } from "express";
import User, { InterfaceUser } from "../models/User";
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {

    try {
        const user: InterfaceUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        if (!user.username || !user.email || !user.password) {
            return res.status(400).json('Please enter all the details');
        }
        //Check if the user already exist
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(422).json('User already exist with the given email');
        }
        user.password = await user.encryptPassword(user.password);
        const savedUser = await user.save();
        //token
        // const token: string = jwt.sign({ _id: savedUser._id }, process.env.JWT_TOKEN || 'dummy_token', {
        //     expiresIn: 60 * 60 * 24
        // });
        // return res.cookie('token', token).json({ success: true, message: 'User registered successfully', data: savedUser })
        return res.status(201).json({ success: true, message: 'User registered successfully', data: savedUser })
    } catch (error) {
        return res.json({ error: error });
    }
};

export const login = async (req: Request, res: Response) => {

    try {
        const user: InterfaceUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        if (!user.email || !user.password) {
            return res.status(400).json('Please enter all the details');
        }
        //Check if the user already exist or not
        const userExist = await User.findOne({ email: req.body.email });
        if (!userExist) {
            return res.status(401).json('Invalid Email');
        }
        //Check password match
        const correctPassword: boolean = await userExist.validatePassword(req.body.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid Password');
        }
        const token: string = jwt.sign({ _id: userExist._id }, process.env.JWT_TOKEN || '', {
            expiresIn: "100s"
        });
        return res.cookie('token', token).json({ success: true, message: 'LoggedIn Successfully' })
    } catch (error) {
        return res.json({ error: error });
    }
};

export const user = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user, { password: 0 });
        if (!user) {
            return res.status(404).json('No User found');
        }
        return res.json({ user: user })
    } catch (error) {
        return res.json({ error: error });
    }
};