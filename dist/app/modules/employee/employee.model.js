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
exports.EmployeeModel = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const EmployeeSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: false },
    role: { type: String, required: true },
    designation: { type: String, required: true },
    companyId: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    profileImageUrl: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
// Pre save middleware hook
EmployeeSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const employee = this;
        //hashing password
        employee.password = yield bcrypt_1.default.hash(employee.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
//post save middleware / hooks
EmployeeSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});
// query middlewares
EmployeeSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
// query middlewares
EmployeeSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
// Work on aggregate
EmployeeSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
exports.EmployeeModel = (0, mongoose_1.model)("Employee", EmployeeSchema);
