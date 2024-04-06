import { PrismaClient } from "@prisma/client";
import { signinSchema } from "../configuration/adminValidation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
export const signinHandler = async (req, res) => {
  const body = req.body;

  const adminValidation = signinSchema.safeParse(body);

  if (!adminValidation) {
    return res.status(422).json({
      error: "Please verify entered credentials",
    });
  }

  const admin = await prisma.admin.findUnique({
    where: {
      email: body.email,
    },
    select: {
      adminname: true,
      password: true,
      id: true
    },
  });

  if (!admin) {
    return res.status(403).json({
      error: "Admin does not exists Please Signup!",
    });
  }

  const verifyPassword = await bcrypt.compare(body.password, admin.password);

  if (!verifyPassword) {
    return res.status(401).json({
      error: "Enter valid password",
    });
  }

  let token = jwt.sign(
    { email: body.email, id: admin.id },
    process.env.JWT_SECRET
  );
  token = `Bearer ${token}`;

  return res.json({
    message: "Signin successfully",
    token,
  });
};
