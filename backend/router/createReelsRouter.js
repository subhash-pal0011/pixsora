import express from "express"
import { isAuth } from "../middelware/isAuth.js"
import { upload } from "../middelware/multer.js"
import { reels } from "../controler/reels.js"

export const createReelsRouter = express.Router()
createReelsRouter.post("/" , isAuth , upload.single("media") , reels)