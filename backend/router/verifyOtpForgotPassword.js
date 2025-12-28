import express from "express"
import { verifyEmailForgotPass } from "../controler/verifyEmailForgotPass.js";

export const verifyOtpForgotPasswordRouter = express.Router();
verifyOtpForgotPasswordRouter.post("/" , verifyEmailForgotPass)
