import mongoose, { Types } from "mongoose";

export interface IConversation {
  title: string;
  history: {
    question: MongoID;
    answer: MongoID[];
  }[];
}

const conversationSchema = new mongoose.Schema<IConversation>(
  {
    title: {
      type: String,
      default: "",
    },
    history: [
      {
        question: {
          type: Types.ObjectId || String,
        },
        answer: [
          {
            type: Types.ObjectId || String,
          },
        ],
      },
    ],
  },
  {},
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
