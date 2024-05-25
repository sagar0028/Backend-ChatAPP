import {Schema,model,Document} from "mongoose";


interface IUserChatMeta extends Document{
    userId: string
    chatId: string
    lastSeen: Date
    online: boolean
    socketId: string
    metaData: any
}


const UserChatMetaSchema = new Schema<IUserChatMeta>({
    userId: {type:String,required:true},
    chatId: {type:String,required:true},
    lastSeen: {type:Date,required:true},
    online: {type:Boolean,required:true},
    socketId: {type:String,required:false},
    metaData: {type:[Schema.Types.Mixed] ,required:false},
})

export const UserChatMeta = model<IUserChatMeta>("ws_user_chat_meta",UserChatMetaSchema);
