import express from "express"
import { isAuth } from "../middelware/isAuth.js"
import { savedPost } from "../controler/savedPost.js"

export const savedPostRouter = express.Router()
savedPostRouter.post("/:id"  ,isAuth , savedPost)