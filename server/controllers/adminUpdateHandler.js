import bcrypt from "bcryptjs";
import { findAdmin, profileUpdate } from "../models/adminModel.js";
import {
  updatePasswordSchema,
  updateProfileSchema,
} from "../configuration/adminValidation.js";

export const adminUpdateHandler = async (req, res) => {
  const body = req.body;
  const email = req.email;
  console.log(email);

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
    const admin = await findAdmin(email);
    console.log(admin);
    const passVerification = await bcrypt.compare(
      body.password,
      admin.password
    );
    console.log(passVerification);
    if (!passVerification) {
      return res.status(422).json({
        error: "Wrong Password",
      });
    }

    // verification of new password which shouldn't be as old password

    const newPassVerification = await bcrypt.compare(
      body.newPassword,
      admin.password
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

  if (response.error) {
    return res.status(500).json({
      error: "Another user exists with provided email please use another email",
    });
  }
  return res.json({
    message: "Profile updated successfully",
  });
};
