import express from 'express'
import { forgetPasswordSendOtp } from '../controler/forgetPasswordSendOtp.js'
export const sendOtpEmailForgotPassRouter = express.Router()
sendOtpEmailForgotPassRouter.post("/" ,  forgetPasswordSendOtp);