"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceHistory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../utils/constants/models");
const referenceHistory = new mongoose_1.default.Schema({
    // messages: {
    //   type: [
    //     {
    //       // Use type object for embedded schema
    //       question: {
    //         type: String,
    //       },
    //       answers: [
    //         {
    //           type: String,
    //         },
    //       ],
    //       _id: false, // Explicitly exclude _id for messages subdocument
    //     },
    //   ],
    //   default: [],
    // },
    text: {
        type: String,
        required: [true, models_1.REQUIRED_FIELD_MSG],
    },
    rich_text: {
        type: String,
        required: [true, models_1.REQUIRED_FIELD_MSG],
    },
    reference_type: {
        type: String,
        unique: true,
        index: true,
        required: [true, models_1.REQUIRED_FIELD_MSG],
    },
}, models_1.DEFAULT_MODAL_TIMESTAMPTS);
exports.ReferenceHistory = mongoose_1.default.model("Reference History", referenceHistory);
