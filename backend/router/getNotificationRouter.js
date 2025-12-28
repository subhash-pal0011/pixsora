import express from "express";
import { isAuth } from "../middelware/isAuth.js";
import { getAllNotification } from "../controler/getAllNotification.js";

export const getNotificationRouter = express.Router();

getNotificationRouter.get("/", isAuth, getAllNotification);
