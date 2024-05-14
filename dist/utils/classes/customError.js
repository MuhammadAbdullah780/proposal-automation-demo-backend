"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor({ msg, statusCode }) {
        super(msg);
        this.isSuccess = false;
        this.statusCode = statusCode;
    }
    serialize() {
        return {
            message: this.message,
            code: this.statusCode,
            isSuccess: this.isSuccess,
        };
    }
}
exports.CustomError = CustomError;
