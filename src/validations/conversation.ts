import Joi from "joi";
//
import { AddConversationDto } from "../types/dtos/addConversation";

export const addConversationSchema = Joi.object<AddConversationDto>({
  title: Joi.string().required().allow(""),
  messages: Joi.array().items({
    question: Joi.string().required().allow(""),
    answer: Joi.array().items(Joi.string().allow("")).min(1),
  }),
});
