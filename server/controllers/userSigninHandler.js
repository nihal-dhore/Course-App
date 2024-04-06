import { PrismaClient } from "@prisma/client";
import { signinSchema } from "../configuration/userValidation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUser } from "../models/userModel.js";

const prisma = new PrismaClient();
export const signinHandler = async (req, res) => {
  const body = req.body;

  const userValidation = signinSchema.safeParse(body);

  if (!userValidation) {
    return res.status(422).json({
      error: "Please verify entered credentials",
    });
  }

  const user = await findUser(body.email);

  if (!user) {
    return res.status(403).json({
      error: "User does not exists Please Signup!",
    });
  }

  const verifyPassword = bcrypt.compareSync(body.password, user.password);

  if (!verifyPassword) {
    return res.status(401).json({
      error: "Enter valid password",
    });
  }

  let token = jwt.sign(
    { email: body.email, id: user.id },
    process.env.JWT_SECRET
  );
  token = `Bearer ${token}`;

  return res.json({
    message: "Signin successfully",
    token,
  });
};
