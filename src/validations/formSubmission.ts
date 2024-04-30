import Joi from "joi";
import { SubmitProposalFormDto } from "../types/dtos/formSubmission";
import { ReferenceHistoryEnum } from "../types/enums";

export const formSubmissionSchema = Joi.object({});

export const submitProposalFormSchema = Joi.object<SubmitProposalFormDto>({
  projectTitle: Joi.string().required(),
  projectDescription: Joi.string().min(5).required(),
  referenceType: Joi.string()
    .valid(...Object.values(ReferenceHistoryEnum))
    .required(),
});
