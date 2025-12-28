import express from "express"
import { isAuth } from "../middelware/isAuth.js"
import { getSelfAllPost } from "../controler/getSelfAllPost.js"

export const getSelfPostRouter = express.Router()
getSelfPostRouter.get("/", isAuth , getSelfAllPost)