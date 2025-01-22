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
exports.LeaveManagementService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const leave_management_model_1 = require("./leave.management.model");
const applyLeaveIntoDB = (leave) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leave_management_model_1.LeaveManagementModel.create(leave);
    return result;
});
const getAllLeavesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leave_management_model_1.LeaveManagementModel.find();
    return result;
});
const geLeaveByCompanyId = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    const leaves = yield leave_management_model_1.LeaveManagementModel.find({ companyId });
    return leaves;
});
const getleaveByEmployeeId = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const leaves = yield leave_management_model_1.LeaveManagementModel.find({ employeeId });
    return leaves;
});
const updateLeaveStatusInDB = (_id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leave_management_model_1.LeaveManagementModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(_id) }, { status: status });
    return result;
});
const deleteSingleLeaveFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leave_management_model_1.LeaveManagementModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(_id) }, { isDeleted: true });
    return result;
});
exports.LeaveManagementService = {
    applyLeaveIntoDB,
    deleteSingleLeaveFromDB,
    geLeaveByCompanyId,
    getleaveByEmployeeId,
    getAllLeavesFromDB,
    updateLeaveStatusInDB,
};
