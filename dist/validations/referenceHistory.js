"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReferenceHistorySchema = exports.createReferenceHistorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createReferenceHistorySchema = joi_1.default.object({
    text: joi_1.default.string().min(20).required(),
    rich_text: joi_1.default.string().required(),
    // messages: Joi.array()
    //   .items({
    //     question: Joi.string().required().allow(""),
    //     answers: Joi.array().items(Joi.string().allow("")).min(1),
    //   })
    //   .default([]),
    reference_type: joi_1.default.string().required(),
});
exports.updateReferenceHistorySchema = joi_1.default.object({
    text: joi_1.default.string().required(),
    rich_text: joi_1.default.string().required(),
});
