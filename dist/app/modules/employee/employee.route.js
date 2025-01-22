"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const employee_controller_1 = require("./employee.controller");
const router = express_1.default.Router();
router.get("/", employee_controller_1.EmployeeControllers.getAllEmployees);
router.post("/create-employee", employee_controller_1.EmployeeControllers.createEmployee);
router.get("/:employeeId", employee_controller_1.EmployeeControllers.getSingleEmployee);
// Route to get work progresses by companyId
router.get("/company/:companyId", employee_controller_1.EmployeeControllers.getEmployeesByCompanyId);
router.delete("/:employeeId", employee_controller_1.EmployeeControllers.deleteEmployee);
router.put("/:employeeId", employee_controller_1.EmployeeControllers.updateEmployee);
router.post("/login", employee_controller_1.EmployeeControllers.loginEmployee);
router.put("/update-password/:employeeId", employee_controller_1.EmployeeControllers.updatePassword);
exports.EmployeeRoutes = router;
