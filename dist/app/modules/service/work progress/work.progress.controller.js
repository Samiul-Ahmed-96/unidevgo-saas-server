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
exports.WorkProgressControllers = void 0;
const work_progress_service_1 = require("./work.progress.service");
// Start tracker
const startTracker = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId, companyId } = req.body;
        console.log(req.body);
        // Validate input
        if (!employeeId || !companyId) {
            return res.status(400).json({
                success: false,
                message: "Employee ID and Company ID are required",
            });
        }
        const progress = yield work_progress_service_1.WorkProgressService.startTracker(employeeId, companyId);
        res.status(200).json({
            success: true,
            message: "Tracker started successfully",
            data: progress,
        });
    }
    catch (err) {
        next(err);
    }
});
// Stop tracker
const stopTracker = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId } = req.body;
        console.log(req.body);
        // Validate input
        if (!employeeId) {
            return res.status(400).json({
                success: false,
                message: "Employee ID is required",
            });
        }
        const progress = yield work_progress_service_1.WorkProgressService.stopTracker(employeeId);
        res.status(200).json({
            success: true,
            message: "Tracker stopped successfully",
            data: progress,
        });
    }
    catch (err) {
        next(err);
    }
});
// Filter work progress with validation and error handling
const filterWorkProgress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId, date, startDate, endDate } = req.body;
        // Validate input
        if (!employeeId) {
            return res.status(400).json({
                success: false,
                message: "Employee ID is required",
            });
        }
        let result;
        if (date) {
            // Filter by single date
            result = yield work_progress_service_1.WorkProgressService.filterWorkProgressByDate(employeeId, new Date(date));
        }
        else if (startDate && endDate) {
            // Filter by date range
            result = yield work_progress_service_1.WorkProgressService.filterWorkProgressByDateRange(employeeId, new Date(startDate), new Date(endDate));
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Invalid filter criteria. Provide either a date or a date range.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Work progress filtered successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
// Get work progress by company ID
const getWorkProgressByCompanyId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        // Validate input
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required",
            });
        }
        const workProgresses = yield work_progress_service_1.WorkProgressService.getWorkProgressByCompanyId(companyId);
        if (workProgresses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No work progress found for the given company Id",
            });
        }
        res.status(200).json({
            success: true,
            message: "Work progresses retrieved successfully",
            data: workProgresses,
        });
    }
    catch (err) {
        next(err);
    }
});
// Get work progress by employee ID
const getWorkProgressByEmployeeId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId } = req.params;
        // Validate input
        if (!employeeId) {
            return res.status(400).json({
                success: false,
                message: "Employee ID is required",
            });
        }
        const workProgresses = yield work_progress_service_1.WorkProgressService.getWorkProgressByEmployeeId(employeeId);
        if (workProgresses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No work progress found for the given employee Id",
            });
        }
        res.status(200).json({
            success: true,
            message: "Work progresses retrieved successfully",
            data: workProgresses,
        });
    }
    catch (err) {
        next(err);
    }
});
// Get work progress (general method)
const getWorkProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield work_progress_service_1.WorkProgressService.getWrokProgressFromDB();
        res.status(200).json({
            success: true,
            message: "Work progress data retrieved",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
});
// Delete work progress
const deleteWorkProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { workProgressId } = req.params;
        // Validate input
        if (!workProgressId) {
            return res.status(400).json({
                success: false,
                message: "Work progress ID is required",
            });
        }
        const result = yield work_progress_service_1.WorkProgressService.deleteSingleWorkProgressFromDB(workProgressId);
        res.status(200).json({
            success: true,
            message: "Work progress deleted successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
});
exports.WorkProgressControllers = {
    startTracker,
    stopTracker,
    filterWorkProgress,
    getWorkProgressByCompanyId,
    getWorkProgressByEmployeeId,
    deleteWorkProgress,
    getWorkProgress,
};
