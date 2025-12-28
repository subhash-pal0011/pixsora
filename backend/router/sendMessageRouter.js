import express from "express"
import { isAuth } from "../middelware/isAuth.js"
import { sendMessage } from "../controler/sendMessage.js"
import { upload } from "../middelware/multer.js"

export const sendMessageRouter = express.Router()
sendMessageRouter.post("/:id" , isAuth , upload.single("media") , sendMessage)