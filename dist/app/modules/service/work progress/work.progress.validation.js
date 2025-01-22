"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workProgressValidation = exports.WorkProgressValidationSchema = void 0;
const zod_1 = require("zod");
exports.WorkProgressValidationSchema = zod_1.z.object({
    employeeId: zod_1.z.string().nonempty("Employee ID is required."),
    companyId: zod_1.z.string().nonempty("Employee ID is required."),
    date: zod_1.z.date().optional(),
    startTime: zod_1.z.date().optional(),
    endTime: zod_1.z.date().optional(),
    totalWorkHours: zod_1.z.number().optional(),
    trackerStatus: zod_1.z.enum(["Running", "Stopped"]).optional(),
    isDeleted: zod_1.z.boolean().optional().default(false),
});
exports.workProgressValidation = {
    WorkProgressValidationSchema: exports.WorkProgressValidationSchema,
};
