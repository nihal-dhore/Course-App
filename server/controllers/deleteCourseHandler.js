import { deleteCourse } from "../models/courseModel";

export const deleteCourseHandler = async (req, res) => {
  const id = req.params.id;

  const course = await deleteCourse(id, req.id);
  

  if (!course) {
    return res.status(404).json({
      error: "Course not found",
    });
  }

  return res.json({
    message: "Course deleted successfully",
  });
};
