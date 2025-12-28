import express from "express";
import { isAuth } from "../middelware/isAuth.js";
import { markAsSeen } from "../controler/markAsSeen.js";

export const markAsSeenRouter = express.Router();

markAsSeenRouter.post("/:id", isAuth, markAsSeen);
