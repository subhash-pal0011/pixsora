import express from "express";
import { isAuth } from "../middelware/isAuth.js";
import { deleteStory } from "../controler/deleteStory.js";

export const deleteStoryRouter = express.Router();

deleteStoryRouter.delete("/:id", isAuth, deleteStory);
