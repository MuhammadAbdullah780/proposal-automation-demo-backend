import { Router } from "express";
import { createPrompt, fetchPrompts } from "../controllers/prompts.controller";
import { checkValidation } from "../middlewares/checkValidation";

const routes = Router();

routes.get("/", fetchPrompts);
routes.post("/create", checkValidation("createPrompt"), createPrompt);

export default routes;
