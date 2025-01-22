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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionServices = void 0;
const subscription_model_1 = require("./subscription.model");
const createSubscriptionIntoDB = (subscription) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subscription_model_1.SubscriptionModel.create(subscription);
    return result;
});
const getAllSubscriptionFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subscription_model_1.SubscriptionModel.find();
    return result;
});
const getSingleSubscriptionFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subscription_model_1.SubscriptionModel.findOne({ id });
    return result;
});
const deleteSubscriptionFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subscription_model_1.SubscriptionModel.updateOne({ id }, { isDeleted: true });
    return result;
});
const updateSubscriptionInDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subscription_model_1.SubscriptionModel.findOneAndUpdate({ id }, { $set: updateData }, { new: true });
    return result;
});
exports.SubscriptionServices = {
    createSubscriptionIntoDB,
    getAllSubscriptionFromDB,
    getSingleSubscriptionFromDB,
    deleteSubscriptionFromDB,
    updateSubscriptionInDB,
};
