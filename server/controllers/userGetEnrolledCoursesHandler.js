import { findEnrolledCourses } from "../models/userModel.js";

export const userGetEnrolledCoursesHandler = async (req, res) => {
  const courses = await findEnrolledCourses(req.id);
  if (!courses || courses.courses.length == 0) {
    return res.status(404).json({
      error: "User is not enrolled in any course",
    });
  }
  return res.json(courses);
};
