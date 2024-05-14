"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addConversationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addConversationSchema = joi_1.default.object({
    title: joi_1.default.string().required().allow(""),
    messages: joi_1.default.array().items({
        question: joi_1.default.string().required().allow(""),
        answer: joi_1.default.array().items(joi_1.default.string().allow("")).min(1),
    }),
});
