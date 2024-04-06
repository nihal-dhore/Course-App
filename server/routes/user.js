import express from "express";
import { signupHandler } from "../controllers/userSignupHandler.js";
import { upload } from "../middlewares/multer.middleware.js";
import { signinHandler } from "../controllers/userSigninHandler.js";
import { userUpdateHandler } from "../controllers/userUpdateHandler.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import { userCourseEnrollmentHandler } from "../controllers/userCourseEnrollmentHandler.js";
import { userGetEnrolledCoursesHandler } from "../controllers/userGetEnrolledCoursesHandler.js";

export const userRouter = express.Router();

userRouter.post("/signup", upload.single("profilePicture"), signupHandler);
userRouter.post("/signin", signinHandler);
userRouter.post("/update", userAuth, userUpdateHandler);
userRouter.post("/enroll/:id", userAuth, userCourseEnrollmentHandler);
userRouter.get("/enrolled-courses", userAuth,userGetEnrolledCoursesHandler);

/* userRouter.post("/upload", upload.single("img"), async (req, res) => {
  console.log(req.file);
  const profilePic = await profilePicUpload(req.file.path);
  return res.json({
    profilePic
  })
});
 */
