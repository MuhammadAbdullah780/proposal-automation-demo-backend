import mongoose from "mongoose";
import {
  DEFAULT_MODAL_TIMESTAMPTS,
  FIELD_REQUIRED_MSG,
} from "../utils/constants/models";

export interface IAnswer {
  content: string;
}

const answerSchema = new mongoose.Schema<IAnswer>(
  {
    content: {
      type: String,
      required: [true, FIELD_REQUIRED_MSG],
    },
  },
  DEFAULT_MODAL_TIMESTAMPTS,
);

export const Answer = mongoose.model<IAnswer>("Questions", answerSchema);
