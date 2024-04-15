import { addConversationSchema } from "./conversation";
import { formSubmissionSchema } from "./formSubmission";

export const validators = {
  formSubmission: formSubmissionSchema,
  addConversation: addConversationSchema,
};
