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
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHandler = void 0;
const customError_1 = require("../classes/customError");
const requestHandler = (handler, { responseStatus = 200 } = {}) => {
    const executableFunc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(res?.status(200).json({ mesg: "fd" }), "RESPONSE_________");
        let isException = false;
        const raiseException = (msg, code) => __awaiter(void 0, void 0, void 0, function* () {
            isException = true;
            const err = new customError_1.CustomError({ msg, statusCode: code });
            return res.status(err.statusCode).json(err.serialize());
        });
        try {
            const { data, message, isSuccess = true, } = yield handler({
                res,
                req,
                raiseException,
            });
            if (!isException) {
                return res.status(responseStatus).json({
                    message,
                    data,
                    isSuccess,
                });
            }
        }
        catch (error) {
            const err = new customError_1.CustomError({
                msg: error === null || error === void 0 ? void 0 : error.message,
                statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || 500,
            });
            return res.status(err.statusCode).json(err.serialize());
        }
    });
    return executableFunc;
};
exports.requestHandler = requestHandler;
