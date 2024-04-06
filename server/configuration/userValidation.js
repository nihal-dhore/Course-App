import zod from "zod";

const password = zod
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  });

export const signupSchema = zod.object({
  username: zod.string().min(2),
  email: zod.string().email({ message: "Please verify email address" }),
  password,
});

export const signinSchema = zod.object({
  email: zod.string().email({ message: "Please verify email address" }),
  password,
});

export const updateProfileSchema = zod.object({
  username: zod.string().min(2).optional(),
  email: zod
    .string()
    .email({ message: "Please verify email address" })
    .optional(),
  age: zod
    .number()
    .min(18, { message: "Age must be greater than or equal to 18" })
    .max(100, { message: "Age must be less than or equal to 130" })
    .optional(),
});

export const updatePasswordSchema = zod.object({
  password,
  newPassword: zod
    .string()
    .min(8, { message: "New password must be at least 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});
