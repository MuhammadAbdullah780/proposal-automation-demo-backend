"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSubmissions = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../utils/constants/models");
const enums_1 = require("../types/enums");
const formSubmissionSchema = new mongoose_1.default.Schema({
    // form_type_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    // },
    // conversation_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    // },
    // submission: {
    //   type: mongoose.Schema.Types.Mixed,
    //   required: [true, REQUIRED_FIELD_MSG],
    // },
    payload: {
        type: mongoose_1.default.Schema.Types.Mixed,
        required: [true, models_1.REQUIRED_FIELD_MSG],
    },
    generated_from: {
        type: String,
        enum: enums_1.ModalType,
        required: [true, models_1.REQUIRED_FIELD_MSG],
    },
    response: {
        type: String,
        required: [true, models_1.REQUIRED_FIELD_MSG],
    },
}, models_1.DEFAULT_MODAL_TIMESTAMPTS);
exports.FormSubmissions = mongoose_1.default.model("FormSubmissions", formSubmissionSchema);
