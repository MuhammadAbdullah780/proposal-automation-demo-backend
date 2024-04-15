import Joi from "joi";
// import { AddConversationDto } from "../types/dtos/addConversation";

export const addConversationSchema = Joi.object({
  title: Joi.string().required().allow(""),
  messages: Joi.array().items({
    question: Joi.string().required().allow(""),
    answer: Joi.array().items(Joi.string().allow("")).min(1),
  }),
});

// title: Joi.string().optional(),
// messages: Joi.array()
//   .items({
//     question: Joi.string(),
//     answer: Joi.array().items(Joi.string()).min(1),
//   })
//   .optional(),
