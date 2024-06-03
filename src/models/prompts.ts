import mongoose from "mongoose";
import {
  DEFAULT_MODAL_TIMESTAMPTS,
  REQUIRED_FIELD_MSG,
} from "../utils/constants/models";

export interface IPrompt {
  title: string;
  template?: string;
  variables?: string[];
  templateInRichText?: string;
}

const promptSchema = new mongoose.Schema<IPrompt>(
  {
    title: {
      type: String,
      required: [true, REQUIRED_FIELD_MSG],
    },
    template: {
      type: String,
      required: [true, REQUIRED_FIELD_MSG],
    },
    templateInRichText: {
      type: String,
      required: [true, REQUIRED_FIELD_MSG],
    },
    variables: [
      {
        type: String,
      },
    ],
  },
  DEFAULT_MODAL_TIMESTAMPTS,
);

export const Prompt = mongoose.model<IPrompt>("Prompt Templates", promptSchema);
