"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Routes
// import conversationRoutes from "./conversations.routes";
const submissions_routes_1 = __importDefault(require("./submissions.routes"));
const referenceHistory_routes_1 = __importDefault(require("./referenceHistory.routes"));
const prompts_routes_1 = __importDefault(require("./prompts.routes"));
const router = (0, express_1.Router)();
const routesMapper = [
    // { path: "/conversations", router: conversationRoutes },
    { path: "/submissions", router: submissions_routes_1.default },
    { path: "/reference-history", router: referenceHistory_routes_1.default },
    { path: "/prompts", router: prompts_routes_1.default },
];
routesMapper.forEach((route) => {
    router.use(route.path, route.router);
});
exports.default = router;
