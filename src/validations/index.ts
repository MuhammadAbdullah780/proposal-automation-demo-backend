import { addConversationSchema } from "./conversation";
import { formSubmissionSchema } from "./formSubmission";
import {
  addReferenceHistorySchema,
  createReferenceHistorySchema,
} from "./referenceHistory";

export const validators = {
  formSubmission: formSubmissionSchema,
  addConversation: addConversationSchema,
  addReferenceHistory: addReferenceHistorySchema,
  createReferenceHistory: createReferenceHistorySchema,
};
