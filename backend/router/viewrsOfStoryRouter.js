import express from "express"
import { isAuth } from "../middelware/isAuth.js"
import { viewrsOfStory } from "../controler/viewrsOfStory.js"

export const viewrsOfStoryRouter = express.Router()
viewrsOfStoryRouter.get("/:id" , isAuth , viewrsOfStory)