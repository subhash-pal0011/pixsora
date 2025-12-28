import express from "express"
import { isAuth } from "../middelware/isAuth.js"
import { likePost } from "../controler/like.js"

export const likePostRouter = express.Router()
likePostRouter.post("/:id" , isAuth , likePost)