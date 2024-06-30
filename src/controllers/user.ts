import { NextFunction, Request, Response } from "express";
import userSchema from "../types/user";
import { User } from "../models/user";
interface Options{
    $regex: string,
    $options: string
}
interface UserInfo{
    userName?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    $options?: string,
}
interface QueryObj{
    userName?: Options,
    firstName?: Options,
    lastName?: Options,
}
const updateUser = async (req: Request, res: Response, next: NextFunction)=>{
    // zod validation
    
    const createPayload = req.body;
    const parsedPayload = userSchema.updateUserInfo.safeParse(createPayload);
    if(!parsedPayload.success) return res.status(400).json({message: parsedPayload.error.message})
    const userInfo: UserInfo = parsedPayload.data;

// query
    const userUpdated = await User.findByIdAndUpdate(req.headers.userId, userInfo)
    if(!userUpdated) return next('Something went wrong!')
        console.log(userUpdated);
    return res.status(201).json({message: 'User updated!'});
}

const bulkUser = async (req: Request, res: Response)=>{
    const filter = req.query.filter || ''
    const {sort, select} = req.query;
    const sortString = String(sort)
    const selectString = String(select)
    
        let query = User.find({
            $or: [{
                firstName: {
                    "$regex": filter,
                    "$options": 'i'
                }
            }, {
                lastName: {
                    "$regex": filter,
                    "$options": 'i'
                }
            }]
        });
        if(sort){
            
            const sortItem = sortString.replace(',', ' ');
            console.log(sortItem);
            query.sort(sortItem)
        }
        if(select){
            const selectItem = selectString.split(',').join(' ')
            query.select(selectItem);
        }
    try {
    const users = (await query);
    const totalUsers = users.length;
    return res.status(200).json({
        user: users.map(user => ({
            username: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
     
, totalUsers});
    } catch (error) {
        console.log(error);
    }
}
export default {updateUser, bulkUser};