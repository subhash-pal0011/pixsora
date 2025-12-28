import express from "express";
import { isAuth } from "../middelware/isAuth.js";
import { deletePost } from "../controler/deletePost.js";

export const deletePostRouter = express.Router();

deletePostRouter.delete("/:id", isAuth, deletePost);
