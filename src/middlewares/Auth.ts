import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const userAuth = (req: Request, res: Response, next: NextFunction)=>{
    const auth = req.headers['authorization']
    try {
        if(!auth?.startsWith('BEARER')) return next('Token is not present!')
        const token = auth.split(' ')[1];
        jwt.verify(token, "1234", (err, payload)=>{
            if(err) return next('Invalid Token!')
                if(!payload) return next('Invalid Token!')
                    if(typeof payload === 'string') return;
            req.headers['userId'] = payload.id;
            console.log(req.headers['userId']);
            next()
            })
            
    } catch (error) {
        return next(error);
    }

}

export default userAuth;