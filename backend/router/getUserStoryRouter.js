import express from "express"
import { getUserStory } from "../controler/getUserStory.js"
import { isAuth } from "../middelware/isAuth.js"

export const getUserStoryRouter = express.Router()

getUserStoryRouter.get("/:userName" ,isAuth, getUserStory)