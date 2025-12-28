import express from "express"
import { getConversation } from "../controler/getConversation.js"
import { isAuth } from "../middelware/isAuth.js"
export const getConversationRouter = express.Router()
getConversationRouter.get("/", isAuth ,getConversation)