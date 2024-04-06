import zod from "zod";
export const courseSchema = zod.object({
  title: zod.string().min(1, { message: "Title must not be empty" }),
  description: zod.string(),
  level: zod.enum(["Beginner", "Intermediate", "Advanced"]),
  category: zod.string(),
});

export const updateCourseSchema = zod.object({
  title: zod.string().min(1, { message: "Title must not be empty" }).optional(),
  description: zod.string().optional(),
  level: zod.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
  category: zod.string().optional(),
});

