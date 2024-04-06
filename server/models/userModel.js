import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const findUser = async (email) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const createUser = async (body, hashedPassword) => {
  const prisma = new PrismaClient();
  return await prisma.user.create({
    data: {
      email: body.email,
      password: hashedPassword,
      username: body.username,
    },
  });
};

/* export const updateUserDetails = async (body) => {
  await prisma.user.update({
    where
  })
} */

export const profileUpdate = async (body, email) => {
  const prisma = new PrismaClient();
  try {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        username: body.username || undefined,
        email: body.email || undefined,
        age: body.age || undefined,
        password: body.password || undefined,
      },
    });
  } catch (error) {
    console.log(error);
    return "Internal Server Error";
  }
};

export const enrollCourse = async (userId, courseId) => {
  const prisma = new PrismaClient();
  try {
    const alreadyEnrolled = await prisma.user.findUnique({
      where: {
        id: userId,
        courses: {
          some: {
            id: courseId,
          },
        },
      },
    });

    if (alreadyEnrolled) {
      return "alreadyEnrolled";
    }
    const enrollment = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        courses: {
          connect: {
            id: courseId,
          },
        },
      },
      select: {
        courses: {
          where: {
            id: courseId,
          },
          select: {
            _count: {
              select: {
                users: true,
              },
            },
            id: true,
            title: true,
          },
        },
      },
    });

    if (
      enrollment.courses[0]._count.users > 1000 &&
      enrollment.courses[0]._count.users > 5000
    ) {
      await prisma.course.update({
        where: {
          id: courseId,
        },
        data: {
          popularity: "Mid",
        },
      });
    }

    if (enrollment.courses[0]._count.users > 5000) {
      await prisma.course.update({
        where: {
          id: courseId,
        },
        data: {
          popularity: "High",
        },
      });
    }

    return enrollment;
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return { error };
    }
  }
};

export const findEnrolledCourses = async (id) => {
  const prisma = new PrismaClient();
  try {
    const courses = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        courses: {
          select: {
            admin: {
              select: {
                adminname: true,
              },
            },
            title: true,
            description: true,
            level: true,
            popularity: true,
            category: true,
            id: true,
          },
        },
      },
    });
    return courses;
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return { error };
    }
  }
};
