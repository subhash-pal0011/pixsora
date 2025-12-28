import express from "express"
import { isAuth } from "../middelware/isAuth.js"
import { getMessage } from "../controler/getMessage.js"

export const getMessageRouter = express.Router()
getMessageRouter.get("/:id" , isAuth , getMessage)