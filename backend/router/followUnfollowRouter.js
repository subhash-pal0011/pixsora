import express from "express"
import { followUnfollow } from "../controler/followUnfollow.js"
import { isAuth } from "../middelware/isAuth.js"

export const followUnfollowRouter = express.Router()
followUnfollowRouter.post("/:id" , isAuth , followUnfollow)