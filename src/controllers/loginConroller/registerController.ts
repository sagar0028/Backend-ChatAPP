import {NextFunction, Request, Response} from 'express';
import {User} from '../../models/userModel';
import {generateToken} from "../../utils/helpers/jwt"

export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const {password, email} = req.body;
    try {
        
        if (!email || !password) {
            //@ts-ignore
            return res.status(400).send({message: "Payload not found!"});
        }
        const checkUser = await User.findOne({email});
        console.log('checkUser:', checkUser);
        if (!checkUser) {
            const newUser = new User({name, email});
            const saveUser = await newUser.save();
            const token = await generateToken(email,password);
            //@ts-ignore
            return res.status(200).send({message: "User created successfully", userData: saveUser, token:token});
        } else {
            //@ts-ignore
            return res.status(409).send({message: "User already exists", userData: null,});
        }
    } catch (error) {
        console.error('Error during user signup:', error);
        //@ts-ignore
        return res.status(500).send({message: "Internal server error"});
    }
};


export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const {email, password} = req.body;
    try {
        if (!email || !password) {
            //@ts-ignore
            return res.status(400).send({message: "Payload not found!"});
        }
        const checkUser = await User.findOne({email});
        if (checkUser) {
            const token = await generateToken(email,password);
            //@ts-ignore
            return res.status(200).send({message: "User logged in successfully", userData: checkUser,token:token});
        } else {
            //@ts-ignore
            return res.status(404).send({message: "User not found", userData: null,});
        }
    } catch (error) {
        console.error('Error during user login:', error);
        //@ts-ignore
        return res.status(500).send({message: "Internal server error"});
    }   
};
