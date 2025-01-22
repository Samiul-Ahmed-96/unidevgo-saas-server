"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionValidation = void 0;
const zod_1 = require("zod");
const SubscriptionValidationSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, "ID is required"),
    plan: zod_1.z.string().min(1, "Plan is required"),
    services: zod_1.z.array(zod_1.z.string()).min(1, "At least one service is required"),
    startDate: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format for start Date",
    }), // Validates ISO 8601 date string
    expiryDate: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format for expiry Date",
    }),
    status: zod_1.z.enum(["active", "inactive"]),
    price: zod_1.z.number(),
    isDeleted: zod_1.z.boolean().optional().default(false),
});
exports.SubscriptionValidation = {
    SubscriptionValidationSchema,
};
