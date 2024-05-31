import { Router } from "express";
import {
  createPrompt,
  deletePrompt,
  fetchPrompts,
} from "../controllers/prompts.controller";
import { checkValidation } from "../middlewares/checkValidation";

const routes = Router();

routes.get("/", fetchPrompts);
routes.post("/create", checkValidation("createPrompt"), createPrompt);
routes.delete("/:id/delete", deletePrompt);

export default routes;
