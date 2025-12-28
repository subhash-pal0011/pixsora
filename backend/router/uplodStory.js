import express from "express";
import { isAuth } from "../middelware/isAuth.js";
import { upload } from "../middelware/multer.js";
import { uploadStory } from "../controler/uplodStory.js";

export const uplodStoryRouter = express.Router();

uplodStoryRouter.post(
       "/",
       isAuth,
       //            story ISI KA NAME LIKH KR FORM DATA SE BHEJENGE
       upload.array("media", 10),   // <-- max 10 stories allowed
       uploadStory
);
