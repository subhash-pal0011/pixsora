import express from "express"
import { getAllStory } from "../controler/getAllStory.js"
import { isAuth } from "../middelware/isAuth.js"

export const getAllStoryRouter = express.Router()
getAllStoryRouter.get("/" , isAuth, getAllStory)