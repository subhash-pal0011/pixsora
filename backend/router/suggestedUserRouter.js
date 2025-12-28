import express from 'express'
import { suggestedUser } from '../controler/suggestedUser.js'
import { isAuth } from '../middelware/isAuth.js'

export const suggestedUserRouter = express.Router()
suggestedUserRouter.get("/" , isAuth, suggestedUser)