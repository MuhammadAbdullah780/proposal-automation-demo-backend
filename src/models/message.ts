import mongoose from "mongoose";
import {
  DEFAULT_MODAL_TIMESTAMPTS,
  REQUIRED_FIELD_MSG,
} from "../utils/constants/models";

export interface IMessage {
  question: string;
  answer: string[];
}

const messageSchema = new mongoose.Schema<IMessage>(
  {
    question: {
      type: String,
      required: [true, REQUIRED_FIELD_MSG],
    },
    answer: [
      {
        type: String,
        min: [1, "{VALUE} contains minimum of 1 item"],
        required: [true, REQUIRED_FIELD_MSG],
      },
    ],
  },
  DEFAULT_MODAL_TIMESTAMPTS,
);

export const Message = mongoose.model<IMessage>("Messages", messageSchema);
