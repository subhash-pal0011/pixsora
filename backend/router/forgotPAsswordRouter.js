import express from "express"
import { forgotPassword } from "../controler/forgotPassword.js";

export const forgotPasswordRouter = express.Router();
forgotPasswordRouter.post("/" , forgotPassword)