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
exports.EmployeeControllers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const employee_service_1 = require("./employee.service");
const employee_validation_1 = require("./employee.validation");
// Utility function for handling and responding to errors
const handleError = (res, error, statusCode = 500, defaultMessage = "Something went wrong") => {
    console.error("Error:", error); // Log the error for debugging
    const message = error instanceof zod_1.ZodError
        ? error.errors.map((e) => e.message).join(", ") // Format zod validation errors
        : error.message || defaultMessage;
    res.status(statusCode).json({
        success: false,
        message,
        error: error.stack || error, // Include stack trace in non-production environments
    });
};
// Controller to create a new employee
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employee: employeeData } = req.body;
        // Validate input using zod schema
        const zodParseData = employee_validation_1.employeeValidation.employeeValidationSchema.parse(employeeData);
        // Create the employee in the database
        const result = yield employee_service_1.EmployeeService.createEmployeeIntoDB(zodParseData);
        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: result,
        });
    }
    catch (error) {
        // Handle validation errors explicitly
        if (error instanceof zod_1.ZodError) {
            handleError(res, error, 400, "Validation error");
        }
        else {
            handleError(res, error);
        }
    }
});
// Controller to retrieve all employees
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield employee_service_1.EmployeeService.getAllEmployeesFromDB();
        if (result.length === 0) {
            res.status(404).json({
                success: false,
                message: "No employees found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Employees data retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Controller to retrieve a single employee by ID
const getSingleEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId } = req.params;
        const result = yield employee_service_1.EmployeeService.getSingleEmployeeFromDB(employeeId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Employee not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Employee retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Get work progress by company ID
const getEmployeesByCompanyId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        // Validate input
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required",
            });
        }
        const employees = yield employee_service_1.EmployeeService.getEmployeesByCompanyIdFromDB(companyId);
        if (employees.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No employees found for the given company Id",
            });
        }
        res.status(200).json({
            success: true,
            message: "Employees data retrieved successfully",
            data: employees,
        });
    }
    catch (err) {
        next(err);
    }
});
// Controller to delete an employee by ID
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId } = req.params;
        const result = yield employee_service_1.EmployeeService.deleteEmployeeFromDB(employeeId);
        if (result.matchedCount === 0) {
            res.status(404).json({
                success: false,
                message: "Employee not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
            data: result,
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Controller to update an employee's details
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId } = req.params;
        const updateData = req.body;
        // Check if update data is provided
        if (!updateData) {
            res.status(400).json({
                success: false,
                message: "No update data provided",
            });
            return;
        }
        const result = yield employee_service_1.EmployeeService.updateEmployeeInDB(employeeId, updateData);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Employee not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: result,
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Controller for employee login
const loginEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
            return;
        }
        // Fetch the employee by email
        const employee = yield employee_service_1.EmployeeService.getEmployeeByEmail(email);
        if (!employee || employee.isDeleted) {
            res.status(404).json({
                success: false,
                message: "Invalid email or employee not found",
            });
            return;
        }
        // Verify the password
        const isPasswordValid = yield bcrypt_1.default.compare(password, employee.password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: "Invalid password",
            });
            return;
        }
        // Generate a JWT for authentication
        const token = jsonwebtoken_1.default.sign({
            _id: employee._id,
            id: employee.id,
            name: employee.name,
            email: employee.email,
        }, process.env.JWT_SECRET || "jwt_secret", { expiresIn: "1h" });
        res.status(200).json({
            success: true,
            message: "Login successfully",
            token,
            profile: {
                _id: employee._id,
                id: employee.id,
                name: employee.name,
                email: employee.email,
                profileImageUrl: employee.profileImageUrl,
                address: employee.address,
                contactNumber: employee.contactNumber,
                designation: employee.designation,
                companyId: employee.companyId,
                gender: employee.gender,
                joiningDate: employee.joiningDate,
            },
            role: "employee",
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Controller to update an employee's password
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId } = req.params;
        const { currentPassword, newPassword } = req.body;
        // Validate input
        if (!currentPassword || !newPassword) {
            res.status(400).json({
                success: false,
                message: "Current password and new password are required",
            });
            return;
        }
        // Fetch the employee by ID
        const employee = yield employee_service_1.EmployeeService.getSingleEmployeeFromDB(employeeId);
        if (!employee || employee.isDeleted) {
            res.status(404).json({
                success: false,
                message: "Employee not found",
            });
            return;
        }
        // Verify the current password
        const isPasswordValid = yield bcrypt_1.default.compare(currentPassword, employee.password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: "Current password is incorrect",
            });
            return;
        }
        // Update the password in the database
        const result = yield employee_service_1.EmployeeService.updateEmployeePasswordInDB(employeeId, newPassword);
        if (!result) {
            res.status(500).json({
                success: false,
                message: "Failed to update password",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Export all controllers
exports.EmployeeControllers = {
    createEmployee,
    getAllEmployees,
    getSingleEmployee,
    getEmployeesByCompanyId,
    deleteEmployee,
    updateEmployee,
    loginEmployee,
    updatePassword,
};
