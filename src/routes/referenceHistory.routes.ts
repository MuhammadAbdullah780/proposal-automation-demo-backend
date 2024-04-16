import { Router } from "express";
import {
  appendMessagesToReferenceHistory,
  createReferenceHistory,
  fetchReferenceHistory,
} from "../controllers/referenceHistory.controller";
import { checkValidation } from "../middlewares/checkValidation";

const routes = Router();

routes.get("/", fetchReferenceHistory);

routes.post(
  "/add-messages",
  checkValidation("addReferenceHistory"),
  appendMessagesToReferenceHistory,
);

routes.post(
  "/create",
  checkValidation("createReferenceHistory"),
  createReferenceHistory,
);

export default routes;
