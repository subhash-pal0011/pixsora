import express from "express"
import { isAuth } from "../middelware/isAuth.js"
import { getAllReels } from "../controler/getAllReels.js"

export const getAllReelsRouter = express.Router()
getAllReelsRouter.get("/" , isAuth , getAllReels)