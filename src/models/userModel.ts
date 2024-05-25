import {Schema,model, Document} from "mongoose";


interface IUser extends Document {
    email: string;
    phone_number: string;
    name: string;
    address: string;
    avatar: string;
    dob: string;
    gender: string;
}

const UserSchema = new Schema<IUser>({
    email:{type:String,unique:true,required:true},
    phone_number:{type:String,required:false},
    name:{type:String,required:true},
    address:{type:String,required:false},
    avatar:{type:String,required:false},
    dob:{type:String,required:false},
    gender:{type:String,required:false},
})

export const User = model<IUser>("ws_users",UserSchema);