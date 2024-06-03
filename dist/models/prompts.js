"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prompt = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../utils/constants/models");
const promptSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, models_1.REQUIRED_FIELD_MSG],
    },
    template: {
        type: String,
        required: [true, models_1.REQUIRED_FIELD_MSG],
    },
    templateInRichText: {
        type: String,
        required: [true, models_1.REQUIRED_FIELD_MSG],
    },
    variables: [
        {
            type: String,
        },
    ],
}, models_1.DEFAULT_MODAL_TIMESTAMPTS);
exports.Prompt = mongoose_1.default.model("Prompt Templates", promptSchema);
