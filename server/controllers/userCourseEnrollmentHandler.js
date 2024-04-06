import { enrollCourse } from "../models/userModel.js";
import { mail } from "../utils/mail.js";

export const userCourseEnrollmentHandler = async (req, res) => {
  const userId = req.id;
  const courseId = req.params.id;

  const enrollment = await enrollCourse(userId, courseId);
  if (enrollment === "alreadyEnrolled") {
    return res.status(403).json({
      error: "User is already enrolled",
    });
  }

  //console.log(enrollment);
  if (enrollment && enrollment.error) {
    return res.status(404).json({
      error: "Course not found",
    });
  }

  if (!enrollment) {
    return res.status(500).json({
      error: "Internal",
    });
  }

  await mail(
    process.env.EMAIL,
    "Enrolled successfully",
    "Start attending lectures today"
  );

  return res.json({
    courses: enrollment.courses,
  });
};
