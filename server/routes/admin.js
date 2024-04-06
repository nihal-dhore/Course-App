import express from "express";
import { signinHandler } from "../controllers/adminSigninHandler.js";
import { adminUpdateHandler } from "../controllers/adminUpdateHandler.js";
import { signupHandler } from "../controllers/adminSignupHandler.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { getAdminCoursesHandler } from "../controllers/getAdminCoursesHandler.js";

export const adminRouter = express.Router();

adminRouter.post("/signup", signupHandler);
adminRouter.post("/signin", signinHandler);
adminRouter.post("/update", adminAuth, adminUpdateHandler);
adminRouter.get("/courses/:id?", adminAuth, getAdminCoursesHandler);