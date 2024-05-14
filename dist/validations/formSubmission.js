"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitProposalFormSchema = exports.formSubmissionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const enums_1 = require("../types/enums");
exports.formSubmissionSchema = joi_1.default.object({});
exports.submitProposalFormSchema = joi_1.default.object({
    projectTitle: joi_1.default.string().required(),
    projectDescription: joi_1.default.string().min(5).required(),
    referenceType: joi_1.default.string().required(),
    llm: joi_1.default.string().valid(...Object.values(enums_1.ModalType)),
});
