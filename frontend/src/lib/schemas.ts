import * as z from "zod";

// Common error messages - makes getting error messages consistent
const errorMessages = {
  required: (field: string) => `${field} is required.`,
  invalid: (field: string) =>
    `Looks like you have entered an invalid ${field.toLowerCase()}.`,
  tooShort: (field: string, min: number) =>
    `This ${field.toLowerCase()} is too short. It must have at least ${min} characters.`,
  tooLong: (field: string, max: number) =>
    `This ${field.toLowerCase()} is too long. Maximum length is ${max}.`,
};

// Reusable password schema
const passwordSchema = z
  .string({
    required_error: errorMessages.required("Password"),
    invalid_type_error: errorMessages.invalid("Password"),
  })
  .min(8, { message: errorMessages.tooShort("Password", 8) })
  .max(32, { message: errorMessages.tooLong("Password", 32) })
  .regex(/[a-z]/, "Password must include at least one lowercase letter.")
  .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
  .regex(/\d/, "Password must include at least one number.")
  .regex(/^\S+$/, "Password can't include spaces.");

// Login schema
// decided not to use "reusable password schema",
// because most sites allow to type anything in password field, when logging in - anyway it's easy to change
export const loginSchema = z.object({
  email: z
    .string({
      required_error: errorMessages.required("E-Mail"),
      invalid_type_error: errorMessages.invalid("E-Mail"),
    })
    .min(4, { message: errorMessages.tooShort("E-Mail", 4) })
    .max(50, { message: errorMessages.tooLong("E-Mail", 50) })
    .email("Please provide a valid e-mail address."),
  password: z
    .string({
      required_error: errorMessages.required("Password"),
      invalid_type_error: errorMessages.invalid("Password"),
    })
    .min(1, { message: errorMessages.required("Password") }),
});

// Registration schema
export const registerSchema = loginSchema
  .extend({
    name: z
      .string({
        required_error: errorMessages.required("Name"),
        invalid_type_error: errorMessages.invalid("Name"),
      })
      .min(3, { message: errorMessages.tooShort("Name", 3) })
      .max(50, { message: errorMessages.tooLong("Name", 50) })
      .regex(
        /^[a-zA-Z' ]+$/,
        "Your name can only include letters, single quotes, and spaces.",
      ),
    password: passwordSchema,
    confirmPassword: z.string({
      required_error: "Please confirm your password.",
      invalid_type_error: errorMessages.invalid("Password"),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export type TLoginForm = z.infer<typeof loginSchema>;
export type TRegisterForm = z.infer<typeof registerSchema>;
