import express from "express"
import { isAuth } from "../middelware/isAuth.js"
import { notificationCount } from "../controler/notificationCount.js"

export const notificationCountRouter = express.Router()
notificationCountRouter.get("/" , isAuth , notificationCount)