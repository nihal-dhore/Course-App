import { courseSchema } from "../configuration/courseValidation.js";
import { createCourse } from "../models/courseModel.js";
export const createCourseHandler = async (req, res) => {
  const body = req.body;
  const id = req.id;
  const path = req.file.path;
  console.log(id);
  const courseValidation = courseSchema.safeParse(body);
  if (!courseValidation.success) {
    return res.status(422).json({
      error: courseValidation.error.issues[0].message,
    });
  }

  const course = await createCourse(body, id, path);

  if (!course) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }

  return res.json({
    message: "Course created successfully",
  });
};
