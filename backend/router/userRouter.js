import express from 'express'
import { getCurrentUser } from '../controler/userControler.js';
import { isAuth } from '../middelware/isAuth.js';



export const userRouter = express.Router();

userRouter.get("/",  isAuth, getCurrentUser )