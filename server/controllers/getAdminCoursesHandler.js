import { getAdminCourses } from "../models/courseModel.js";

export const getAdminCoursesHandler = async (req, res) => {
  const id = req.params.id;
  const courses = await getAdminCourses(req.id, id);

  if (!courses) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }

  return res.json({
    courses
  })
};
