import { PrismaClient } from "@prisma/client";
import { fileUpload } from "../utils/fileUpload.cloudinary.js";

export const getCourses = async (page, body) => {
  const prisma = new PrismaClient();
  try {
    const courses = await prisma.course.findMany({
      skip: page * 10 - 10,
      take: 10,
      where: {
        category: body.category || undefined,
        level: body.level || undefined,
        popularity: body.popularity || undefined,
      },
      select: {
        id: true,
        title: true,
        description: true,
        level: true,
        popularity: true,
        category: true,
        admin: {
          select: {
            adminname: true,
          },
        },
      },
    });
    return courses;
  } catch (error) {
    console.log(error);
  }
};

export const createCourse = async (body, id, path) => {
  const prisma = new PrismaClient();
  try {

    await fileUpload(path);

    return await prisma.course.create({
      data: {
        title: body.title,
        description: body.description,
        level: body.level,
        category: body.category,
        adminId: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCourse = async (body, id, adminId) => {
  const prisma = new PrismaClient();
  try {
    const course = await prisma.course.update({
      where: {
        id,
        adminId,
      },
      data: {
        title: body.title || undefined,
        description: body.description || undefined,
        category: body.category || undefined,
        level: body.level || undefined,
        popularity: body.popularity || undefined,
      },
      select: {
        id: true,
        title: true,
        description: true,
        level: true,
        popularity: true,
        category: true,
        admin: {
          select: {
            adminname: true,
          },
        },
      },
    });
    return course;
  } catch (error) {
    console.log(error);
  }
};

export const getAdminCourses = async (adminId, id) => {
  // console.log(adminId);
  const prisma = new PrismaClient();
  try {
    const courses = await prisma.course.findMany({
      where: {
        adminId,
        id: id || undefined,
      },
      select: {
        id: true,
        title: true,
        description: true,
        level: true,
        popularity: true,
        category: true,
      },
    });
    return courses;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCourse = async (adminId, id) => {
  const prisma = new PrismaClient()
  try {
    const course = await prisma.course.delete({
      where: {
        adminId,
        id
      }
    })
    return course;
  } catch (error) {
    console.log(error);
    return error;
  }
} 