"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveManagentValidation = void 0;
const zod_1 = require("zod");
const leaveManagementValidationSchema = zod_1.z.object({
    employeeId: zod_1.z.string().min(1, "Employee ID is required"),
    companyId: zod_1.z.string().min(1, "Company ID is required"),
    leaveApply: zod_1.z
        .union([zod_1.z.date(), zod_1.z.string().transform((val) => new Date(val))])
        .refine((date) => !isNaN(date.getTime()), {
        message: "Invalid leave application date",
    }),
    leaveFrom: zod_1.z
        .union([zod_1.z.date(), zod_1.z.string().transform((val) => new Date(val))])
        .refine((date) => !isNaN(date.getTime()), {
        message: "Invalid leave start date",
    }),
    leaveTo: zod_1.z
        .union([zod_1.z.date(), zod_1.z.string().transform((val) => new Date(val))])
        .refine((date) => !isNaN(date.getTime()), {
        message: "Invalid leave end date",
    }),
    leaveType: zod_1.z.string().min(1, "Leave type is required"),
    totalDays: zod_1.z.number().min(1, "Total days must be at least 1"),
    status: zod_1.z.enum(["Pending", "Accepted", "Rejected"]),
    isDeleted: zod_1.z.boolean().default(false),
});
// For updating leave management status
const leaveStatusUpdateSchema = zod_1.z.object({
    status: zod_1.z.enum(["Pending", "Accepted", "Rejected"]),
});
exports.leaveManagentValidation = {
    leaveManagementValidationSchema,
    leaveStatusUpdateSchema,
};
