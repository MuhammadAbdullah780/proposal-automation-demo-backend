import { Router } from "express";
import { checkValidation } from "../middlewares/checkValidation";
import { submitProposalForm } from "../controllers/submissions.controller";

const routes = Router();

routes.post(
  "/proposal/create",
  checkValidation("submitProposalForm"),
  submitProposalForm,
);

export default routes;
