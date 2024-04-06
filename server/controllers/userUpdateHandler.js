import bcrypt from "bcryptjs";
import { findUser, profileUpdate } from "../models/userModel.js";
import {
  updatePasswordSchema,
  updateProfileSchema,
} from "../configuration/userValidation.js";

export const userUpdateHandler = async (req, res) => {
  const body = req.body;
  const email = req.email;

  //console.log(body.password, email);

  if (body.password) {
    const passwordValidation = updatePasswordSchema.safeParse({
      password: body.password,
      newPassword: body.newPassword,
    });
    if (!passwordValidation.success) {
      return res.status(401).json({
        error: passwordValidation.error.issues[0].message,
      });
    }
    const user = await findUser(email);
    const passVerification = await bcrypt.compare(body.password, user.password);
    if (!passVerification) {
      return res.status(422).json({
        error: "Wrong Password",
      });
    }

    // verification of new password which shouldn't be as old password

    const newPassVerification = await bcrypt.compare(
      body.newPassword,
      user.password
    );

    if (newPassVerification) {
      return res.status(422).json({
        error: "New password should not match with existing password",
      });
    }
    const profileValidation = updateProfileSchema.safeParse(body);
    if (!profileValidation.success) {
      return res.status(422).json({
        error: profileValidation.error.issues[0].message,
      });
    }
    body.password = await bcrypt.hash(body.newPassword, 10);
  }
  
  const response = await profileUpdate(body, email);
  if (!response) {
    return res.json({
      message: "Profile updated successfully",
    });
  }

  return res.status(500).json({
    error: response,
  });
};
