import { updateCourseSchema } from "../configuration/courseValidation.js";
import { updateCourse } from "../models/courseModel.js";

export const updateCourseHandler = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const updateValidation = updateCourseSchema.safeParse(body);

  if (!updateValidation.success) {
    return res.status(422).json({
      error: updateValidation.error.issues[0].message,
    });
  }

  const course = await updateCourse(body, id, req.id);

  if (!course) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }

  return res.json({
    message: "Course updated successfully",
  });
};
