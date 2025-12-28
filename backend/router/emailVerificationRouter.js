import express from "express"
import { emailVerificationSendOtp } from "../controler/emailVerificationSendOtp.js"



export const emailVerificationRouter = express.Router()

emailVerificationRouter.post("/", emailVerificationSendOtp)