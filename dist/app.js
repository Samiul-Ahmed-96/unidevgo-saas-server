"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const admin_route_1 = require("./app/modules/admin/admin.route");
const company_route_1 = require("./app/modules/company/company.route");
const employee_route_1 = require("./app/modules/employee/employee.route");
const leave_management_route_1 = require("./app/modules/service/leave management/leave.management.route");
const work_progress_route_1 = require("./app/modules/service/work progress/work.progress.route");
const subscription_route_1 = require("./app/modules/subscription/subscription.route");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//Application routes
app.use("/api/v1/admins", admin_route_1.AdminRoutes);
app.use("/api/v1/companies", company_route_1.CompanyRoutes);
app.use("/api/v1/employees", employee_route_1.EmployeeRoutes);
app.use("/api/v1/subscriptions", subscription_route_1.SubscriptionRoutes);
app.use("/api/v1/work-progress", work_progress_route_1.WorkProgressRoutes);
app.use("/api/v1/leave", leave_management_route_1.LeaveManagementRoutes);
app.get("/", (req, res) => {
    res.send("Server Running");
});
exports.default = app;
