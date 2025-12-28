import express from "express"
import { isAuth } from "../middelware/isAuth.js"
import { reelsLike } from "../controler/reelsLike.js"

export const reelsLiketRouter = express.Router()
reelsLiketRouter.post("/:id" , isAuth , reelsLike)