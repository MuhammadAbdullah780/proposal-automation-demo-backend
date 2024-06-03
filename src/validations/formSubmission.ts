import Joi from "joi";
import {
  CreateSubmissionDto,
  SubmitProposalFormDto,
} from "../types/dtos/formSubmission";
import { ModalType } from "../types/enums";

export const formSubmissionSchema = Joi.object({});

export const submitProposalFormSchema = Joi.object<SubmitProposalFormDto>({
  projectTitle: Joi.string().required(),
  projectDescription: Joi.string().min(5).required(),
  referenceType: Joi.string().required(),
  llm: Joi.string().valid(...Object.values(ModalType)),
});

export const createSubmissionSchema = Joi.object<CreateSubmissionDto>({
  referenceType: Joi.string().required(),
  llm: Joi.string().valid(...Object.values(ModalType)),
  promptType: Joi.string().required(),
  variables: Joi.object().required(),
});
