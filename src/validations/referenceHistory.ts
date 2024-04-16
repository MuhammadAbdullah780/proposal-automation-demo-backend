import Joi from "joi";
import {
  AddReferenceHistoryDto,
  CreateReferenceHistoryDto,
} from "../types/dtos/referenceHistory";
import { ReferenceHistoryEnum } from "../types/enums";

export const addReferenceHistorySchema = Joi.object<AddReferenceHistoryDto>({
  referenceType: Joi.string().valid(...Object.values(ReferenceHistoryEnum)),
  messages: Joi.array()
    .items({
      question: Joi.string().required().allow(""),
      answers: Joi.array().items(Joi.string().allow("")).min(1),
    })
    .min(1),
});

export const createReferenceHistorySchema =
  Joi.object<CreateReferenceHistoryDto>({
    messages: Joi.array()
      .items({
        question: Joi.string().required().allow(""),
        answers: Joi.array().items(Joi.string().allow("")).min(1),
      })
      .default([]),
    reference_type: Joi.string()
      .valid(...Object.values(ReferenceHistoryEnum))
      .required(),
  });
