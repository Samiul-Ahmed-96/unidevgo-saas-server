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
exports.LeaveManagementControllers = void 0;
const zod_1 = require("zod");
const leave_management_service_1 = require("./leave.management.service");
const leave_management_validation_1 = require("./leave.management.validation");
// Utility function for centralized error handling
const handleError = (res, error, statusCode = 500, defaultMessage = "Something went wrong") => {
    console.error("Error:", error); // Log the error for debugging
    const message = error instanceof zod_1.ZodError
        ? error.errors.map((e) => e.message).join(", ") // Format validation errors
        : error.message || defaultMessage;
    res.status(statusCode).json({
        success: false,
        message,
        error: error.stack || error, // Include stack trace for debugging in non-production environments
    });
};
// Controller to apply for a leave
const applyLeave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { leave: leaveData } = req.body;
        // Validate input using zod schema
        const parsedData = leave_management_validation_1.leaveManagentValidation.leaveManagementValidationSchema.parse(leaveData);
        // Save leave to the database
        const result = yield leave_management_service_1.LeaveManagementService.applyLeaveIntoDB(parsedData);
        res.status(201).json({
            success: true,
            message: "Leave applied successfully",
            data: result,
        });
    }
    catch (error) {
        handleError(res, error, error instanceof zod_1.ZodError ? 400 : 500);
    }
});
// Controller to retrieve all leaves
const getAllLeaves = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield leave_management_service_1.LeaveManagementService.getAllLeavesFromDB();
        if (result.length === 0) {
            res.status(404).json({
                success: false,
                message: "No leave records found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Leaves retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Controller to retrieve leaves by company ID
const getLeaveByCompanyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        const leaves = yield leave_management_service_1.LeaveManagementService.geLeaveByCompanyId(companyId);
        if (leaves.length === 0) {
            res.status(404).json({
                success: false,
                message: "No leave records found for the given company ID",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Leaves retrieved successfully",
            data: leaves,
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Controller to retrieve leaves by employee ID
const getLeaveByEmployeeId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId } = req.params;
        const leaves = yield leave_management_service_1.LeaveManagementService.getleaveByEmployeeId(employeeId);
        if (leaves.length === 0) {
            res.status(404).json({
                success: false,
                message: "No leave records found for the given employee ID",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Leave records retrieved successfully",
            data: leaves,
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Controller to update leave status
const updateLeaveStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { leaveId } = req.params;
        const { status } = req.body;
        if (!status) {
            res.status(400).json({
                success: false,
                message: "Status is required",
            });
            return;
        }
        const result = yield leave_management_service_1.LeaveManagementService.updateLeaveStatusInDB(leaveId, status);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Leave record not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Leave status updated successfully",
            data: result,
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Controller to delete a leave record
const deleteLeave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { leaveId } = req.params;
        const result = yield leave_management_service_1.LeaveManagementService.deleteSingleLeaveFromDB(leaveId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Leave record not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Leave record deleted successfully",
            data: result,
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Export all controllers
exports.LeaveManagementControllers = {
    applyLeave,
    getAllLeaves,
    getLeaveByCompanyId,
    getLeaveByEmployeeId,
    updateLeaveStatus,
    deleteLeave,
};
