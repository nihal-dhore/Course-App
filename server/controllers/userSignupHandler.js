import { signupSchema } from "../configuration/userValidation.js";
import bcrypt from "bcrypt";
import { createUser, findUser } from "../models/userModel.js";

import jwt from "jsonwebtoken";
import { mail } from "../utils/mail.js";
import { fileUpload } from "../utils/fileUpload.cloudinary.js";

export const signupHandler = async (req, res) => {
  const body = req.body;
  const signup = signupSchema.safeParse(body);
  //console.log(signup.error);
  //console.log(signup.error.issues[0].message);
  if (!signup.success) {
    return res.status(400).json({
      error: signup.error.issues[0].message,
    });
  }

  const alreadyUser = await findUser(body.email);

  if (alreadyUser) {
    return res.status(409).json({
      error: "User already exists",
    });
  }

  try {
    const hashedPassword = bcrypt.hashSync(body.password, 10);
    await fileUpload(req.file.path);
    const user = await createUser(body, hashedPassword);
    let token = jwt.sign(
      { email: body.email, id: user.id },
      process.env.JWT_SECRET
    );
    token = `Bearer ${token}`;
    const mailRes = await mail(
      process.env.EMAIL,
      "Registered successfully",
      "Welcome to course app"
    );
    //console.log(mailRes);
    return res.json({
      message: "User has been registered successfully",
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
