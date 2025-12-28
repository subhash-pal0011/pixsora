import express from "express"
import { deleteComment } from "../controler/deleteComment.js"
import { isAuth } from "../middelware/isAuth.js"
export const deleteCommentRouter = express.Router()
deleteCommentRouter.delete("/:postId/:commentId" , isAuth , deleteComment)