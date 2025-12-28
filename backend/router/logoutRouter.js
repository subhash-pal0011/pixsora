import express from "express"
import { logout } from "../controler/logout.js";

export const logoutRouter = express.Router();

logoutRouter.get("/" , logout)