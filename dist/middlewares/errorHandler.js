"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customError_1 = require("../utils/classes/customError");
const errorHandler = (err, req, res) => {
    console.log("INSIDE__ERROR_____HANDLER");
    if (err instanceof customError_1.CustomError) {
        return res.status(err === null || err === void 0 ? void 0 : err.statusCode).json(err.serialize());
    }
    else {
        return res.status(500).send("Internal Server Error");
    }
};
exports.errorHandler = errorHandler;
