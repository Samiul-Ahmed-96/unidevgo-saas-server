"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionModel = void 0;
const mongoose_1 = require("mongoose");
const SubscriptionSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    plan: { type: String, required: true },
    services: { type: [String], required: true },
    startDate: { type: String, required: true },
    expiryDate: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], required: true },
    price: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.SubscriptionModel = (0, mongoose_1.model)("Subscription", SubscriptionSchema);
