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
exports.AdminServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const admin_model_1 = require("./admin.model");
const createAdminInDB = (adminData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.AdminModel.create(adminData);
    return result;
});
const getAllAdminsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const admins = yield admin_model_1.AdminModel.find();
    return admins;
});
const getAdminByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.AdminModel.findOne({ id });
    return admin;
});
const deleteAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.AdminModel.updateOne({ id }, { isDeleted: true });
    return result;
});
const updateAdminInDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.AdminModel.findOneAndUpdate({ id }, { $set: updateData }, { new: true });
    return result;
});
const getAdminByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.AdminModel.findOne({ email });
    return result;
});
const updateAdminPasswordInDB = (id, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield admin_model_1.AdminModel.findOneAndUpdate({ id }, { $set: { password: hashedPassword } }, { new: true });
    return result;
});
exports.AdminServices = {
    createAdminInDB,
    getAllAdminsFromDB,
    getAdminByIdFromDB,
    updateAdminInDB,
    deleteAdminFromDB,
    getAdminByEmail,
    updateAdminPasswordInDB,
};
