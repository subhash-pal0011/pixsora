import express from "express"
import { isAuth } from "../middelware/isAuth.js";
import { getProfile } from "../controler/getProfile.js";

export const getProfileRouter = express.Router();

getProfileRouter.get("/:userName", isAuth, getProfile);
