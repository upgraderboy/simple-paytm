import { NextFunction, Request, Response } from "express";
import userValid from '../types/user'
import { User } from "../models/user";


// types
interface registerSchema{
    userName: string,
    firstName?: string,
    lastName?: string,
    password: string,
}
const register = async (req: Request, res: Response, next: NextFunction)=>{
   try {
     // zod type validation
     const parsedPayload = userValid.createUser.safeParse(req.body);
     if(!parsedPayload.success) return res.status(400).json({errors: parsedPayload.error.errors[0].message})
      const {userName, firstName, lastName, password}: registerSchema = parsedPayload.data;
   
   
   // logic
   const userExist = await User.findOne({userName});
   if(userExist) return next('User Already Exists!')
   
   
     
   
   // db query
   const user = new User({userName: userName, firstName, lastName, password});
   const userCreated = await user.save()
   console.log(userCreated)
     if(userCreated) return res.status(201).json({message: 'User created Successfully!'})
   } catch (error:any) {
    return res.json({message: error})
   }
}
const signin = async (req: Request, res: Response, next: NextFunction)=>{
   const createPayload = req.body;
   const parsedPayload = userValid.signUser.safeParse(createPayload);
   if(!parsedPayload.success) return res.status(400).json({message: parsedPayload.error.message})
      const {userName, password} = parsedPayload.data;
   try {
      // query
      const user = await User.findOne({userName}).select("+password")
      console.log(user)
      if(!user) return next('User Not Found!')
         const isMatch = await user.comparePassword(password);
      if(!isMatch) return next('Check your credentials!')
         const token = await user.generateJwt();
      return res.status(201).json({message: 'LoginedIn Successfully!', token})
   } catch (error) {
      
   }
}
export default {register, signin};