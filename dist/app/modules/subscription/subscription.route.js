"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const subscription_controller_1 = require("./subscription.controller");
const router = express_1.default.Router();
router.get("/", subscription_controller_1.SubscriptionControllers.getAllSubscription);
router.post("/create-subscription", subscription_controller_1.SubscriptionControllers.createSubscription);
router.get("/:subscriptionId", subscription_controller_1.SubscriptionControllers.getSingleSubscription);
router.delete("/:subscriptionId", subscription_controller_1.SubscriptionControllers.deleteSubscription);
router.put("/:subscriptionId", subscription_controller_1.SubscriptionControllers.updateSubscription);
exports.SubscriptionRoutes = router;
