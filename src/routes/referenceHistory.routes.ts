import { Router } from "express";
import {
  createReferenceHistory,
  deleteReference,
  fetchReferenceHistory,
  fetchSpecificReference,
  listReferences,
  updateReferenceHistory,
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

routes.patch("/:referenceType/update", updateReferenceHistory);
routes.get("/list-references", listReferences);
routes.get("/:referenceId", fetchSpecificReference);
routes.delete("/:id/delete", deleteReference);

export default routes;
