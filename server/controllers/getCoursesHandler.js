import { getCourses } from "../models/courseModel.js"

export const getCoursesHandler =async (req, res) => {
  const courses = await getCourses(req.params.page, req.body);
  if (!courses) {
    return res.status(500).json({
      error: "Internal server error"
    })
  }
  return res.json(courses);
}