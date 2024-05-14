"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const referenceHistory_controller_1 = require("../controllers/referenceHistory.controller");
const checkValidation_1 = require("../middlewares/checkValidation");
const routes = (0, express_1.Router)();
routes.get("/", referenceHistory_controller_1.fetchReferenceHistory);
// routes.post(
//   "/add-messages",
//   checkValidation("addReferenceHistory"),
//   appendMessagesToReferenceHistory,
// );
routes.post("/create", (0, checkValidation_1.checkValidation)("createReferenceHistory"), referenceHistory_controller_1.createReferenceHistory);
routes.patch("/:referenceType/update", referenceHistory_controller_1.updateReferenceHistory);
routes.get("/list-references", referenceHistory_controller_1.listReferences);
routes.get("/:referenceId", referenceHistory_controller_1.fetchSpecificReference);
routes.delete("/:id/delete", referenceHistory_controller_1.deleteReference);
exports.default = routes;
