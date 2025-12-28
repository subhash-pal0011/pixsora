import express from "express"
import { isAuth } from "../middelware/isAuth.js"
import { editMessage } from "../controler/editMessage.js"
export const editMessageRouter = express.Router()
editMessageRouter.post("/:id" , isAuth , editMessage)