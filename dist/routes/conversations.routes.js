"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkValidation_1 = require("../middlewares/checkValidation");
const conversation_controller_1 = require("../controllers/conversation.controller");
const routes = (0, express_1.Router)();
routes.post("/new", (0, checkValidation_1.checkValidation)("addConversation"), conversation_controller_1.addNewConversation);
routes.get("/", conversation_controller_1.fetchConversations);
routes.post("/add-messages", conversation_controller_1.addConversationMessages);
exports.default = routes;
