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
exports.checkValidation = void 0;
const index_1 = require("../validations/index");
const http_status_1 = __importDefault(require("http-status"));
const checkValidation = (target) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log({
                target,
                body: req.body,
                // parsed: JSON.parse(req.body),
            });
            const validated = yield index_1.validators[target].validateAsync(req.body);
            req.body = validated;
            next();
        }
        catch (err) {
            return res.status(http_status_1.default.UNPROCESSABLE_ENTITY).json({
                message: (err === null || err === void 0 ? void 0 : err.message) || "Error Occured while validating request body",
            });
        }
    });
};
exports.checkValidation = checkValidation;
