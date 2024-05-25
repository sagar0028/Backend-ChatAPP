import {NextFunction} from "express";
import { UserChatMeta } from "../models/userChatMeta";

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    console.log("this_funcitno", req.body)
    // @ts-ignore
    const {message, isBroadcast, sender} = req?.body;
    // @ts-ignore
    const chatId = req.params.chatId
    const data = await UserChatMeta.findOne({userId: sender, chatId: chatId});

    if (!data) {
        //@ts-ignore
        const newData = new UserChatMeta({userId: sender, chatId: chatId, lastSeen: new Date(), online: true, metaData: message});
        const saveData = await newData.save();
            //@ts-ignore
        return res.status(404).send({message: "Message received", data: saveData,});
    } 
    else{
        const updateData = await UserChatMeta.findOneAndUpdate({userId: sender, chatId: chatId}, {lastSeen: new Date(), online: true, metaData: message});
        //@ts-ignore
        return res.status(200).send({message: "Message Update received", data: updateData,});
    }
    
    //@ts-ignore
    // res.status(200).json({message: '', data: {message, isBroadcast, sender}});
}