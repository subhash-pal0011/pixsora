import express from "express";
import { isAuth } from "../middelware/isAuth.js";
import { markAllNotificationRead } from "../controler/markAllNotificationRead.js";

export const markAllReadRouter = express.Router();

markAllReadRouter.put("/", isAuth, markAllNotificationRead);
