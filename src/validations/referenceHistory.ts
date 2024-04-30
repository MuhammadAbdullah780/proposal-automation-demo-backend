import Joi from "joi";
import {
  CreateReferenceHistoryDto,
  UpdateReferenceHistoryDto,
} from "../types/dtos/referenceHistory";
import { ReferenceHistoryEnum } from "../types/enums";

export const createReferenceHistorySchema =
  Joi.object<CreateReferenceHistoryDto>({
    text: Joi.string().min(20).required(),
    // messages: Joi.array()
    //   .items({
    //     question: Joi.string().required().allow(""),
    //     answers: Joi.array().items(Joi.string().allow("")).min(1),
    //   })
    //   .default([]),
    reference_type: Joi.string()
      .valid(...Object.values(ReferenceHistoryEnum))
      .required(),
  });

export const updateReferenceHistorySchema =
  Joi.object<UpdateReferenceHistoryDto>({
    text: Joi.string().required(),
  });
