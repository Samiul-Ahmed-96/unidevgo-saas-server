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
exports.EmployeeService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const employee_model_1 = require("./employee.model");
const createEmployeeIntoDB = (employee) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield employee_model_1.EmployeeModel.create(employee);
    return result;
});
const getAllEmployeesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield employee_model_1.EmployeeModel.find();
    return result;
});
const getEmployeesByCompanyIdFromDB = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield employee_model_1.EmployeeModel.find({ companyId });
    return result;
});
const getSingleEmployeeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield employee_model_1.EmployeeModel.findOne({ id });
    return result;
});
const deleteEmployeeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield employee_model_1.EmployeeModel.updateOne({ id }, { isDeleted: true });
    return result;
});
const updateEmployeeInDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield employee_model_1.EmployeeModel.findOneAndUpdate({ id }, { $set: updateData }, { new: true });
    return result;
});
const getEmployeeByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield employee_model_1.EmployeeModel.findOne({ email });
    return result;
});
const updateEmployeePasswordInDB = (id, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield employee_model_1.EmployeeModel.findOneAndUpdate({ id }, { $set: { password: hashedPassword } }, { new: true });
    return result;
});
exports.EmployeeService = {
    createEmployeeIntoDB,
    getAllEmployeesFromDB,
    getSingleEmployeeFromDB,
    updateEmployeePasswordInDB,
    getEmployeesByCompanyIdFromDB,
    deleteEmployeeFromDB,
    updateEmployeeInDB,
    getEmployeeByEmail,
};
