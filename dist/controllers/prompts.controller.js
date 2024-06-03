"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePrompt = exports.fetchPrompts = exports.createPrompt = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prompts_1 = require("../models/prompts");
const dbRepository_1 = require("../services/dbRepository");
const requestHandler_1 = require("../utils/functions/requestHandler");
exports.createPrompt = (0, requestHandler_1.requestHandler)((_a) => __awaiter(void 0, [_a], void 0, function* ({ req, raiseException }) {
    const repo = new dbRepository_1.DbRepository(prompts_1.Prompt);
    const body = req === null || req === void 0 ? void 0 : req.body;
    // Check if Prompt with the specific title exists
    const isExists = yield (repo === null || repo === void 0 ? void 0 : repo.isDocExits({
        filter: {
            title: new RegExp(body === null || body === void 0 ? void 0 : body.title, "i"),
        },
    }));
    if (isExists) {
        raiseException("Prompt with that specific title already exists", http_status_1.default.CONFLICT);
    }
    const createdDoc = yield prompts_1.Prompt.create(body);
    return {
        data: createdDoc,
        message: "",
    };
}));
exports.fetchPrompts = (0, requestHandler_1.requestHandler)((_b) => __awaiter(void 0, [_b], void 0, function* ({ raiseException }) {
    const data = yield prompts_1.Prompt.find();
    if (!(data === null || data === void 0 ? void 0 : data.length)) {
        raiseException("No Prompt Template Found in our record", http_status_1.default.NOT_FOUND);
    }
    return {
        data,
        message: "Successfully fetched the Prompts",
    };
}));
exports.deletePrompt = (0, requestHandler_1.requestHandler)((_c) => __awaiter(void 0, [_c], void 0, function* ({ raiseException, req }) {
    var _d;
    const id = (_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.id;
    const repo = new dbRepository_1.DbRepository(prompts_1.Prompt);
    const isDocExists = yield (repo === null || repo === void 0 ? void 0 : repo.isDocExits({
        filter: { _id: id },
    }));
    if (!isDocExists) {
        raiseException("The prompt you are trying to delete is not included in our database", http_status_1.default.NOT_FOUND);
    }
    const deletedData = yield prompts_1.Prompt.findByIdAndDelete(id);
    if (!deletedData) {
        raiseException("Error while deleting the data", http_status_1.default.NOT_IMPLEMENTED);
    }
    return {
        data: deletedData || {},
        message: "Record deleted successfully",
    };
}));
