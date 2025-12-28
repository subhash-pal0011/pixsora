import express from "express"
import { getAllPost } from "../controler/getAllPost.js"
import { isAuth } from "../middelware/isAuth.js"
export const getAllPostRouter = express.Router()
getAllPostRouter.get("/" ,isAuth, getAllPost)