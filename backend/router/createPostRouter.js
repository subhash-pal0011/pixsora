import express from "express";
import { isAuth } from "../middelware/isAuth.js";
import { createPost } from "../controler/createPost.js";
import { upload } from "../middelware/multer.js";

export const createPostRouter = express.Router();

createPostRouter.post("/", isAuth, upload.single("media"), createPost);
