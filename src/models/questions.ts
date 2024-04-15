import mongoose from "mongoose";
import {
  DEFAULT_MODAL_TIMESTAMPTS,
  FIELD_REQUIRED_MSG,
} from "../utils/constants/models";

export interface IQuestion {
  content: string;
}

const questionSchema = new mongoose.Schema<IQuestion>(
  {
    content: {
      type: String,
      required: [true, FIELD_REQUIRED_MSG],
    },
  },
  DEFAULT_MODAL_TIMESTAMPTS,
);

export const Question = mongoose.model<IQuestion>("Questions", questionSchema);
