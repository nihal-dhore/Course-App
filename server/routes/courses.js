import express from "express";
import { getCoursesHandler } from "../controllers/getCoursesHandler.js";
import { createCourseHandler } from "../controllers/createCourseHandler.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { updateCourseHandler } from "../controllers/updateCourseHandler.js";
import { upload } from "../middlewares/multer.middleware.js";

export const courseRouter = express.Router();

courseRouter.get("/:page", getCoursesHandler);
courseRouter.post("/create", adminAuth, upload.single("course"), createCourseHandler);
courseRouter.post("/update/:id", adminAuth, updateCourseHandler);