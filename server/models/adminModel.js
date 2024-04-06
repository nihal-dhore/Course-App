import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const findAdmin = async (email) => {
  const prisma = new PrismaClient();
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });
  return admin;
};

export const createAdmin = async (body, hashedPassword) => {
  const prisma = new PrismaClient();
  return await prisma.admin.create({
    data: {
      email: body.email,
      password: hashedPassword,
      adminname: body.adminname,
    },
  });
};

export const profileUpdate = async (body, email) => {
  const prisma = new PrismaClient();
  try {
    return await prisma.admin.update({
      where: {
        email
      },
      data: {
        adminname: body.adminname || undefined,
        email: body.email || undefined,
        password: body.password || undefined
      }
    })
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return {error: error}
    }
    
    //return error.name;
  }
}
