import Joi from "joi";
import { IPrompt } from "../models/prompts";

export const createPromptSchema = Joi.object<IPrompt>({
  template: Joi.string().min(5).max(1000),
  title: Joi.string().required().min(5),
  templateInRichText: Joi.string().required().min(5),
  variables: Joi.array().items(Joi.string()).min(1),
});
