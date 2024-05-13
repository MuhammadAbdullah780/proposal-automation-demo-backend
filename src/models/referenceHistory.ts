import mongoose from "mongoose";
import {
  DEFAULT_MODAL_TIMESTAMPTS,
  REQUIRED_FIELD_MSG,
} from "../utils/constants/models";
import { ReferenceHistoryEnum } from "../types/enums";

export interface IReferenceHistory {
  // messages: {
  //   question: string;
  //   answers: string[];
  // }[];
  text: string;
  reference_type: ReferenceHistoryEnum;
  rich_text: string;
}

const referenceHistory = new mongoose.Schema<IReferenceHistory>(
  {
    // messages: {
    //   type: [
    //     {
    //       // Use type object for embedded schema
    //       question: {
    //         type: String,
    //       },
    //       answers: [
    //         {
    //           type: String,
    //         },
    //       ],
    //       _id: false, // Explicitly exclude _id for messages subdocument
    //     },
    //   ],
    //   default: [],
    // },
    text: {
      type: String,
      required: [true, REQUIRED_FIELD_MSG],
    },
    rich_text: {
      type: String,
      required: [true, REQUIRED_FIELD_MSG],
    },
    reference_type: {
      type: String,
      unique: true,
      index: true,
      required: [true, REQUIRED_FIELD_MSG],
    },
  },
  DEFAULT_MODAL_TIMESTAMPTS,
);

export const ReferenceHistory = mongoose.model<IReferenceHistory>(
  "Reference History",
  referenceHistory,
);
