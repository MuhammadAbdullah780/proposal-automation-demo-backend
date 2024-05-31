import { Router } from "express";
import { checkValidation } from "../middlewares/checkValidation";
import {
  createSubmission,
  fetchSubmissions,
  submitProposalForm,
} from "../controllers/submissions.controller";

const routes = Router();

routes.post(
  "/proposal/create",
  checkValidation("submitProposalForm"),
  submitProposalForm,
);
routes.post("/create", checkValidation("createSubmission"), createSubmission);

routes.get("/", fetchSubmissions);

export default routes;
