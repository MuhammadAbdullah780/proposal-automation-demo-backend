"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPromptSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createPromptSchema = joi_1.default.object({
    template: joi_1.default.string().min(5).max(1000),
    title: joi_1.default.string().required().min(5),
    templateInRichText: joi_1.default.string().required().min(5),
    variables: joi_1.default.array().items(joi_1.default.string()).min(1),
});
