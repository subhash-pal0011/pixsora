import express from "express"
import { signup } from "../controler/signup.js"

export const signupRouter = express.Router()

signupRouter.post("/", signup)