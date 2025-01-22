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
exports.AdminControllers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const admin_service_1 = require("./admin.service");
const admin_validation_1 = require("./admin.validation");
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
// Controller to create a new admin
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminData = admin_validation_1.AdminValidation.AdminValidationSchema.parse(req.body);
        const result = yield admin_service_1.AdminServices.createAdminInDB(adminData);
        res.status(201).json({
            success: true,
            message: "Admin created successfully",
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
// Controller to retrieve all admins
const getAllAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield admin_service_1.AdminServices.getAllAdminsFromDB();
        if (result.length === 0) {
            res.status(404).json({
                success: false,
                message: "No admins found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Admins retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Controller to retrieve a single admin by ID
const getAdminById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminId } = req.params;
        const result = yield admin_service_1.AdminServices.getAdminByIdFromDB(adminId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Admin not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Admin retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Controller to update admin details
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminId } = req.params;
        const updateData = req.body;
        if (!updateData) {
            res.status(400).json({
                success: false,
                message: "No update data provided",
            });
            return;
        }
        const result = yield admin_service_1.AdminServices.updateAdminInDB(adminId, updateData);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Admin not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Admin updated successfully",
            data: result,
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Controller to delete an admin
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminId } = req.params;
        const result = yield admin_service_1.AdminServices.deleteAdminFromDB(adminId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Admin not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Admin deleted successfully",
            data: result,
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Controller for admin login
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
            return;
        }
        const admin = yield admin_service_1.AdminServices.getAdminByEmail(email);
        if (!admin || admin.isDeleted) {
            res.status(404).json({
                success: false,
                message: "Invalid email or admin not found",
            });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, admin.password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: "Invalid password",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ _id: admin._id, id: admin.id, name: admin.name, email: admin.email }, process.env.JWT_SECRET || "jwt_secret", { expiresIn: "1h" });
        res.status(200).json({
            success: true,
            message: "Login successfully",
            token,
            profile: {
                _id: admin._id,
                id: admin.id,
                name: admin.name,
                email: admin.email,
            },
            role: "admin",
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Controller to update admin password
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminId } = req.params;
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            res.status(400).json({
                success: false,
                message: "Current password and new password are required",
            });
            return;
        }
        const admin = yield admin_service_1.AdminServices.getAdminByIdFromDB(adminId);
        if (!admin || admin.isDeleted) {
            res.status(404).json({
                success: false,
                message: "Admin not found",
            });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(currentPassword, admin.password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: "Current password is incorrect",
            });
            return;
        }
        const result = yield admin_service_1.AdminServices.updateAdminPasswordInDB(adminId, newPassword);
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
exports.AdminControllers = {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
    updatePassword,
};
