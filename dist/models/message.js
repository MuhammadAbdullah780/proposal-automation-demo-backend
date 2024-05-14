"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../utils/constants/models");
const messageSchema = new mongoose_1.default.Schema({
    question: {
        type: String,
        required: [true, models_1.REQUIRED_FIELD_MSG],
    },
    answer: [
        {
            type: String,
            min: [1, "{VALUE} contains minimum of 1 item"],
            required: [true, models_1.REQUIRED_FIELD_MSG],
        },
    ],
}, models_1.DEFAULT_MODAL_TIMESTAMPTS);
exports.Message = mongoose_1.default.model("Messages", messageSchema);
