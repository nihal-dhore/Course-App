import { signupSchema } from "../configuration/adminValidation.js";
import bcrypt from "bcrypt";
import { createAdmin, findAdmin } from "../models/adminModel.js";
import jwt from "jsonwebtoken";

export const signupHandler = async (req, res) => {
  const body = req.body;
  const signup = signupSchema.safeParse(body);
  //console.log(signup.error.issues[0].message);
  if (!signup.success) {
    return res.status(400).json({
      error: signup.error.issues[0].message,
    });
  }

  const alreadyAdmin = await findAdmin(body.email);

  if (alreadyAdmin) {
    return res.status(409).json({
      error: "Admin already exists",
    });
  }

  try {
    const hashedPassword = bcrypt.hashSync(body.password, 10);
    const admin = await createAdmin(body, hashedPassword);
    let token = jwt.sign(
      { email: body.email, id: admin.id },
      process.env.JWT_SECRET
    );
    token = `Bearer ${token}`;
    
    return res.json({
      message: "Admin has been registered successfully",
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
