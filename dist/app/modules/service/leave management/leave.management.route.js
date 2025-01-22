"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveManagementRoutes = void 0;
const express_1 = __importDefault(require("express"));
const leave_management_controller_1 = require("./leave.management.controller");
const router = express_1.default.Router();
router.get("/", leave_management_controller_1.LeaveManagementControllers.getAllLeaves);
router.post("/apply-leave", leave_management_controller_1.LeaveManagementControllers.applyLeave);
router.get("/company/:companyId", leave_management_controller_1.LeaveManagementControllers.getLeaveByCompanyId);
router.get("/employee/:employeeId", leave_management_controller_1.LeaveManagementControllers.getLeaveByEmployeeId);
router.put("/:leaveId", leave_management_controller_1.LeaveManagementControllers.updateLeaveStatus);
router.delete("/:leaveId", leave_management_controller_1.LeaveManagementControllers.deleteLeave);
exports.LeaveManagementRoutes = router;
