import mongoose from "mongoose";
import {
  DEFAULT_MODAL_TIMESTAMPTS,
  REQUIRED_FIELD_MSG,
} from "../utils/constants/models";
import { ReferenceHistoryEnum } from "../types/enums";

export interface IReferenceHistory {
  messages: {
    question: string;
    answers: string[];
  }[];
  reference_type: ReferenceHistoryEnum;
}

const referenceHistory = new mongoose.Schema<IReferenceHistory>(
  {
    messages: {
      type: [
        {
          // Use type object for embedded schema
          question: {
            type: String,
          },
          answers: [
            {
              type: String,
            },
          ],
          _id: false, // Explicitly exclude _id for messages subdocument
        },
      ],
      default: [],
    },
    reference_type: {
      type: String,
      unique: true,
      index: true,
      enum: Object.values(ReferenceHistoryEnum),
      required: [true, REQUIRED_FIELD_MSG],
    },
  },
  DEFAULT_MODAL_TIMESTAMPTS,
);

export const ReferenceHistory = mongoose.model<IReferenceHistory>(
  "Reference History",
  referenceHistory,
);
