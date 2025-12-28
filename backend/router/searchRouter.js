import express from "express"
import { isAuth } from "../middelware/isAuth.js"
import { search } from "../controler/search.js"

export const searchRouter = express.Router()
searchRouter.get("/", isAuth , search)