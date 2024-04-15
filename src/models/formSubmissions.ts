import mongoose from "mongoose";
import {
  DEFAULT_MODAL_TIMESTAMPTS,
  REQUIRED_FIELD_MSG,
} from "../utils/constants/models";

export interface IFormSubmission {
  form_type_id: MongoID;
  conversation_id: MongoID;
  submission: ProjectCatalogFormPayload | ProposalFormSubmission;
}

interface ProjectCatalogFormPayload {
  project_title: string;
  project_description: string;
}

interface ProposalFormSubmission {
  job_description: string;
}

const formSubmissionSchema = new mongoose.Schema<IFormSubmission>(
  {
    form_type_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    conversation_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    submission: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, REQUIRED_FIELD_MSG],
    },
  },
  DEFAULT_MODAL_TIMESTAMPTS,
);

export const FormSubmissions = mongoose.model(
  "FormSubmissions",
  formSubmissionSchema,
);
