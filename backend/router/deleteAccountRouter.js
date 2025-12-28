import express from "express"
import { isAuth } from "../middelware/isAuth.js"
import { deleteAccount } from "../controler/deleteAccount.js"
export const deleteAccountRouter = express.Router()
deleteAccountRouter.delete("/" , isAuth , deleteAccount)