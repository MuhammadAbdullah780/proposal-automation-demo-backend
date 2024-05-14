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
exports.addConversationMessages = exports.fetchConversations = exports.addNewConversation = void 0;
const message_1 = require("../models/message");
const requestHandler_1 = require("../utils/functions/requestHandler");
exports.addNewConversation = (0, requestHandler_1.requestHandler)((_a) => __awaiter(void 0, [_a], void 0, function* ({ req }) {
    const body = req.body;
    console.log(body);
    const insertedDocs = yield message_1.Message.insertMany(body.messages);
    console.log(insertedDocs, "Inserted___Docs___");
    return {
        data: {},
        message: "",
    };
}));
exports.fetchConversations = (0, requestHandler_1.requestHandler)(() => __awaiter(void 0, void 0, void 0, function* () {
    return {
        data: {},
        message: "",
    };
}));
exports.addConversationMessages = (0, requestHandler_1.requestHandler)(() => __awaiter(void 0, void 0, void 0, function* () {
    return {
        data: {},
        message: "",
    };
}));
