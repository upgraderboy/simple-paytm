import express, { Request, Response } from 'express'
import {authController, userController} from '../controllers/index';
import userAuth from '../middlewares/Auth';
const router = express.Router()

router.put('/', userAuth, userController.updateUser);
router.post('/register', userAuth, authController.register);
router.post('/login', authController.signin);
router.get('/bulk', userController.bulkUser);

export default router;