"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeValidation = exports.employeeValidationSchema = void 0;
const zod_1 = require("zod");
exports.employeeValidationSchema = zod_1.z.object({
    id: zod_1.z.string().nonempty({ message: "ID is required and cannot be empty." }),
    name: zod_1.z
        .string()
        .nonempty({ message: "Name is required and cannot be empty." }),
    email: zod_1.z
        .string()
        .email({ message: "Invalid email address." })
        .nonempty({ message: "Email is required and cannot be empty." }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .nonempty({ message: "Password is required and cannot be empty." }),
    needsPasswordChange: zod_1.z.boolean().optional().default(false),
    role: zod_1.z
        .string()
        .nonempty({ message: "Role is required and cannot be empty." }),
    designation: zod_1.z
        .string()
        .nonempty({ message: "Designation is required and cannot be empty." }),
    companyId: zod_1.z
        .string()
        .nonempty({ message: "Company ID is required and cannot be empty." }),
    joiningDate: zod_1.z
        .string()
        .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
        message: "Joining date must be a valid date string.",
    })
        .transform((dateStr) => new Date(dateStr)), // Convert string to Date
    gender: zod_1.z.enum(["male", "female", "other"], {
        message: "Gender must be 'male', 'female', or 'Other'.",
    }),
    profileImageUrl: zod_1.z
        .string()
        .url({ message: "Profile image URL must be a valid URL." })
        .nonempty({
        message: "Profile image URL is required and cannot be empty.",
    }),
    address: zod_1.z
        .string()
        .nonempty({ message: "Address is required and cannot be empty." }),
    contactNumber: zod_1.z
        .string()
        .nonempty({ message: "Contact number is required and cannot be empty." })
        .regex(/^\+?[0-9]{10,15}$/, {
        message: "Contact number must be a valid phone number.",
    }),
    isDeleted: zod_1.z.boolean().optional().default(false),
});
exports.employeeValidation = {
    employeeValidationSchema: exports.employeeValidationSchema,
};
