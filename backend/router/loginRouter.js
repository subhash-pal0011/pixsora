import express from "express"
import { login } from "../controler/login.js"
export const loginRouter = express.Router()
loginRouter.post("/", login)