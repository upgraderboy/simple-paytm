// router imports
import userRouter from './user';
import express from 'express';
const rootRouter = express.Router()

// routes
rootRouter.use('/user', userRouter)

export default rootRouter;
