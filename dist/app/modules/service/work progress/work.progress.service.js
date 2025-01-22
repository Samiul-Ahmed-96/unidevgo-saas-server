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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkProgressService = void 0;
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = __importDefault(require("mongoose"));
const work_progress_model_1 = require("./work.progress.model");
const startTracker = (employeeId, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    const today = (0, moment_1.default)().startOf("day").toDate();
    // Check if a tracker already exists for today
    let progress = yield work_progress_model_1.WorkProgressModel.findOne({
        employeeId,
        companyId,
        date: today,
    });
    if (!progress) {
        // Create a new tracker if none exists
        progress = new work_progress_model_1.WorkProgressModel({
            employeeId,
            companyId,
            date: today,
            startTime: new Date(),
            trackerStatus: "Running",
            isDelete: "false",
        });
        yield progress.save();
    }
    else if (progress.trackerStatus === "Running") {
        throw new Error("Tracker is already running.");
    }
    else {
        progress.startTime = new Date();
        progress.trackerStatus = "Running";
        yield progress.save();
    }
    return progress;
});
const stopTracker = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const today = (0, moment_1.default)().startOf("day").toDate();
    // Find today's tracker
    const progress = yield work_progress_model_1.WorkProgressModel.findOne({ employeeId, date: today });
    if (!progress) {
        throw new Error("No tracker found for today.");
    }
    if (progress.trackerStatus === "Stopped") {
        throw new Error("Tracker is already stopped.");
    }
    const endTime = new Date();
    const totalWorkHours = (0, moment_1.default)(endTime).diff((0, moment_1.default)(progress.startTime), "hours", true);
    progress.endTime = endTime;
    progress.totalWorkHours = totalWorkHours;
    progress.trackerStatus = "Stopped";
    yield progress.save();
    return progress;
});
const filterWorkProgressByDate = (employeeId, date) => __awaiter(void 0, void 0, void 0, function* () {
    // Query for a specific date
    const result = yield work_progress_model_1.WorkProgressModel.find({
        employeeId,
        date: { $eq: date },
    });
    return result;
});
const filterWorkProgressByDateRange = (employeeId, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    // Query for a date range
    const result = yield work_progress_model_1.WorkProgressModel.find({
        employeeId,
        date: {
            $gte: startDate, // Greater than or equal to startDate
            $lte: endDate, // Less than or equal to endDate
        },
    });
    return result;
});
const getWrokProgressFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield work_progress_model_1.WorkProgressModel.find();
    return result;
});
const getWorkProgressByCompanyId = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch work progresses matching the companyId
    const workProgresses = yield work_progress_model_1.WorkProgressModel.find({ companyId });
    return workProgresses;
});
const getWorkProgressByEmployeeId = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch work progresses matching the companyId
    const workProgresses = yield work_progress_model_1.WorkProgressModel.find({ employeeId });
    return workProgresses;
});
const deleteSingleWorkProgressFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield work_progress_model_1.WorkProgressModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(_id) }, { isDeleted: true });
    return result;
});
exports.WorkProgressService = {
    startTracker,
    stopTracker,
    filterWorkProgressByDate,
    filterWorkProgressByDateRange,
    getWorkProgressByCompanyId,
    getWorkProgressByEmployeeId,
    deleteSingleWorkProgressFromDB,
    getWrokProgressFromDB,
};
