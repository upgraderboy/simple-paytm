import { NextFunction, Request, Response } from "express";

const ErrHandler: any = async (err: any, req:Request, res: Response, next: NextFunction)=>{
    return res.status(500).json({message: err})
}
export default ErrHandler;