"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const AdminValidationSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, "ID is required"),
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    role: zod_1.z.enum(["admin", "superAdmin"]),
    isActive: zod_1.z.boolean().optional().default(true),
    isDeleted: zod_1.z.boolean().optional().default(false),
});
const UpdatePasswordValidationSchema = zod_1.z.object({
    currentPassword: zod_1.z
        .string()
        .min(6, "Current password must be at least 6 characters long"),
    newPassword: zod_1.z
        .string()
        .min(6, "New password must be at least 6 characters long"),
});
exports.AdminValidation = {
    AdminValidationSchema,
    UpdatePasswordValidationSchema,
};
