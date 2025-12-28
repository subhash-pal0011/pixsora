import express from "express"
import { isAuth } from "../middelware/isAuth.js"
import { reelsComment } from "../controler/reelsComment.js"

export const reelsCommentRouter  = express.Router()
reelsCommentRouter.post("/:id" , isAuth , reelsComment)