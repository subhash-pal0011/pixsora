import express from "express";
import { isAuth } from "../middelware/isAuth.js";
import { clearChat } from "../controler/clearChat.js";

export const clearChatRouter = express.Router();

clearChatRouter.delete("/:id", isAuth, clearChat);
