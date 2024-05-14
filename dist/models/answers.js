"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../utils/constants/models");
const answerSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: [true, models_1.FIELD_REQUIRED_MSG],
    },
}, models_1.DEFAULT_MODAL_TIMESTAMPTS);
exports.Answer = mongoose_1.default.model("Questions", answerSchema);
