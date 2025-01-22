"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkProgressRoutes = void 0;
const express_1 = __importDefault(require("express"));
const work_progress_controller_1 = require("./work.progress.controller");
const router = express_1.default.Router();
router.get("/", work_progress_controller_1.WorkProgressControllers.getWorkProgress);
router.post("/start", work_progress_controller_1.WorkProgressControllers.startTracker);
router.post("/stop", work_progress_controller_1.WorkProgressControllers.stopTracker);
router.post("/filter", work_progress_controller_1.WorkProgressControllers.filterWorkProgress);
// Route to get work progresses by companyId
router.get("/company/:companyId", work_progress_controller_1.WorkProgressControllers.getWorkProgressByCompanyId);
router.get("/employee/:employeeId", work_progress_controller_1.WorkProgressControllers.getWorkProgressByEmployeeId);
router.delete("/:workProgressId", work_progress_controller_1.WorkProgressControllers.deleteWorkProgress);
exports.WorkProgressRoutes = router;
