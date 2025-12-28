import express from "express"
import { isAuth } from "../middelware/isAuth.js"
import { comment } from "../controler/comment.js"

export const commentPostRouter = express.Router()
commentPostRouter.post("/:id" , isAuth , comment)