import express from "express"
import { isAuth } from "../middelware/isAuth.js"
import { deleteMessage } from "../controler/deleteMsg.js"
export const deleteMessageRouter  = express.Router()
deleteMessageRouter.delete("/:id" , isAuth , deleteMessage)