"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.get("/", admin_controller_1.AdminControllers.getAllAdmins);
router.post("/create-admin", admin_controller_1.AdminControllers.createAdmin);
router.get("/:adminId", admin_controller_1.AdminControllers.getAdminById);
router.put("/:adminId", admin_controller_1.AdminControllers.updateAdmin);
router.delete("/:adminId", admin_controller_1.AdminControllers.deleteAdmin);
router.post("/login", admin_controller_1.AdminControllers.loginAdmin);
router.put("/update-password/:adminId", admin_controller_1.AdminControllers.updatePassword);
exports.AdminRoutes = router;
