"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionControllers = void 0;
const zod_1 = require("zod");
const subscription_service_1 = require("./subscription.service");
const subscription_validation_1 = require("./subscription.validation");
// Utility function for centralized error handling
const handleError = (res, error, statusCode = 500, defaultMessage = "Something went wrong") => {
    console.error("Error:", error); // Log error for debugging
    const message = error instanceof zod_1.ZodError
        ? error.errors.map((e) => e.message).join(", ") // Format validation errors
        : error.message || defaultMessage;
    res.status(statusCode).json({
        success: false,
        message,
        error: error.stack || error, // Include stack trace in non-production environments
    });
};
// Controller to create a new subscription
const createSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subscription: subscriptionData } = req.body;
        // Validate subscription data using Zod schema
        const parsedData = subscription_validation_1.SubscriptionValidation.SubscriptionValidationSchema.parse(subscriptionData);
        const result = yield subscription_service_1.SubscriptionServices.createSubscriptionIntoDB(parsedData);
        res.status(201).json({
            success: true,
            message: "Subscription added successfully",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            handleError(res, error, 400, "Validation error");
        }
        else {
            handleError(res, error);
        }
    }
});
// Controller to get all subscriptions
const getAllSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield subscription_service_1.SubscriptionServices.getAllSubscriptionFromDB();
        if (result.length === 0) {
            res.status(404).json({
                success: false,
                message: "No subscriptions found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Subscriptions retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Controller to get a single subscription by ID
const getSingleSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subscriptionId } = req.params;
        const result = yield subscription_service_1.SubscriptionServices.getSingleSubscriptionFromDB(subscriptionId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Subscription not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Subscription retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Controller to delete a subscription
const deleteSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subscriptionId } = req.params;
        const result = yield subscription_service_1.SubscriptionServices.deleteSubscriptionFromDB(subscriptionId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Subscription not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Subscription deleted successfully",
            data: result,
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Controller to update a subscription
const updateSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subscriptionId } = req.params;
        const updateData = req.body.subscription;
        if (!updateData) {
            res.status(400).json({
                success: false,
                message: "No update data provided",
            });
            return;
        }
        const result = yield subscription_service_1.SubscriptionServices.updateSubscriptionInDB(subscriptionId, updateData);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Subscription not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Subscription updated successfully",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            handleError(res, error, 400, "Validation error");
        }
        else {
            handleError(res, error);
        }
    }
});
// Export all subscription controllers
exports.SubscriptionControllers = {
    createSubscription,
    getAllSubscription,
    getSingleSubscription,
    deleteSubscription,
    updateSubscription,
};
