import { Router } from "express";
import {
  createReferenceHistory,
  fetchReferenceHistory,
} from "../controllers/referenceHistory.controller";
import { checkValidation } from "../middlewares/checkValidation";

const routes = Router();

routes.get("/", fetchReferenceHistory);

// routes.post(
//   "/add-messages",
//   checkValidation("addReferenceHistory"),
//   appendMessagesToReferenceHistory,
// );

routes.post(
  "/create",
  checkValidation("createReferenceHistory"),
  createReferenceHistory,
);

routes.patch("/:referenceType/update", () => {});

export default routes;
