import { Router } from "express";
import { checkValidation } from "../middlewares/checkValidation";
import {
  fetchSubmissions,
  submitProposalForm,
} from "../controllers/submissions.controller";

const routes = Router();

routes.post(
  "/proposal/create",
  checkValidation("submitProposalForm"),
  submitProposalForm,
);

routes.get("/", fetchSubmissions);

export default routes;
