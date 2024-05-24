import { addConversationSchema } from "./conversation";
import { submitProposalFormSchema } from "./formSubmission";
import { createPromptSchema } from "./prompts";
import {
  createReferenceHistorySchema,
  updateReferenceHistorySchema,
} from "./referenceHistory";

export const validators = {
  addConversation: addConversationSchema,
  createReferenceHistory: createReferenceHistorySchema,
  updateReferenceHistory: updateReferenceHistorySchema,
  submitProposalForm: submitProposalFormSchema,
  createPrompt: createPromptSchema,
};
