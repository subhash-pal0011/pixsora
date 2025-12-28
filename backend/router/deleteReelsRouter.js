import express from "express"
import { deleteReels } from "../controler/deleteReels.js"
import { isAuth } from "../middelware/isAuth.js"
export const deleteReelsRouter = express.Router()
deleteReelsRouter.delete("/:id" , isAuth , deleteReels)