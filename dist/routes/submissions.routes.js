"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkValidation_1 = require("../middlewares/checkValidation");
const submissions_controller_1 = require("../controllers/submissions.controller");
const routes = (0, express_1.Router)();
routes.post("/proposal/create", (0, checkValidation_1.checkValidation)("submitProposalForm"), submissions_controller_1.submitProposalForm);
exports.default = routes;
