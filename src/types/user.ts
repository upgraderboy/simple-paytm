import {z} from 'zod';


const createUser = z.object({
    userName: z.string({required_error: 'Username is required!'}).min(2, {message: 'Username must be atleast 2 char!'}).max(20, {message: 'Username must be atmost 20 char!'}),
    password: z.string({required_error: 'Username is required!'}).min(2, {message: 'Password must be atleast 2 char!'}),
    firstName: z.string().optional(),
    lastName: z.string().optional()
});

const signUser = z.object({
    userName: z.string({required_error: 'Username is required!'}).min(2, {message: 'Username must be atleast 2 char!'}).max(20, {message: 'Username must be atmost 20 char!'}),
    password: z.string({required_error: 'Username is required!'}).min(2, {message: 'Password must be atleast 2 char!'}),
    
});
const updateUserInfo = z.object({
    userName: z.string({required_error: 'Username is required!'}).min(2, {message: 'Username must be atleast 2 char!'}).max(20, {message: 'Username must be atmost 20 char!'}).optional(),
    password: z.string({required_error: 'Username is required!'}).min(2, {message: 'Password must be atleast 2 char!'}).optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})
export default {createUser, signUser, updateUserInfo};