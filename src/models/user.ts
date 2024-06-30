import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextFunction } from "express";


// Define interface extending Document
interface IUser extends Document {
    userName: string;
    password: string,
    lastName?: string,
    firstName?: string,
    _id: string,
    // Define instance methods here
    comparePassword(enteredPassword: string): boolean,
    generateJwt(): string
}
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [2, "Username must be atleast 2 chars!"],
        maxLength: [20, "Username must be atmost 20 chars!"]
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        select: false
    },
    firstName: {
        type: String,
        
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        
        trim: true,
        maxLength: 50
    }
})
userSchema.pre<IUser>('save', async function(next){
    try {
        // @ts-ignore
        if(!this.isModified('password')) next()
            this.password = await bcryptjs.hash(this.password, 10);
            next()
    } catch (error) {
        console.log(error)
    }
})
userSchema.methods.comparePassword = async function(this: IUser, enteredPassword: string):Promise<boolean>{
    return bcryptjs.compare(enteredPassword, this.password)
}
userSchema.methods.generateJwt = async function(this: IUser): Promise<string>{
    const token = jwt.sign({userName: this.userName, id: this._id}, "1234")
    console.log(token)
    return token;
}
export const User = mongoose.model<IUser>('User', userSchema);