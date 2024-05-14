"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormType = exports.InputFieldType = exports.FormTypeEnum = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../utils/constants/models");
var FormTypeEnum;
(function (FormTypeEnum) {
    FormTypeEnum["PROPOSAL"] = "proposal";
    FormTypeEnum["PROJECT_CATALOG"] = "project-catalog";
})(FormTypeEnum || (exports.FormTypeEnum = FormTypeEnum = {}));
var InputFieldType;
(function (InputFieldType) {
    InputFieldType["TEXT"] = "text";
    InputFieldType["IMAGE"] = "image";
})(InputFieldType || (exports.InputFieldType = InputFieldType = {}));
const formTypeSchema = new mongoose_1.default.Schema({
    form_type: {
        type: String,
        enum: Object.values(FormTypeEnum),
        required: true,
    },
    fields: [
        {
            input_type: {
                type: String,
                enum: Object.values(InputFieldType),
                default: InputFieldType.TEXT,
            },
            value_type: {
                type: String,
                enum: ["string", "number", "boolean"],
                default: "string",
            },
            label: {
                type: String,
                required: true,
            },
            required: {
                type: Boolean,
                default: false,
            },
        },
    ],
}, models_1.DEFAULT_MODAL_TIMESTAMPTS);
exports.FormType = mongoose_1.default.model("FormType", formTypeSchema);
