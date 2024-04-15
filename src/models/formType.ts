import mongoose from "mongoose";
import { DEFAULT_MODAL_TIMESTAMPTS } from "../utils/constants/models";

export enum FormTypeEnum {
  PROPOSAL = "proposal",
  PROJECT_CATALOG = "project-catalog",
}

export enum InputFieldType {
  TEXT = "text",
  IMAGE = "image",
}

export interface IFormType {
  form_type: FormTypeEnum;
  fields: {
    input_type: InputFieldType;
    value_type: "string" | "number" | "boolean";
    label: string;
    required: boolean;
  }[];
}

const formTypeSchema = new mongoose.Schema<IFormType>(
  {
    form_type: {
      type: String,
      enum: Object.values(FormTypeEnum),
      required: true,
    },
    fields: [
      {
        input_type: {
          type: String,
          enum: Object.values(InputFieldType),
          default: InputFieldType.TEXT,
        },
        value_type: {
          type: String,
          enum: ["string", "number", "boolean"],
          default: "string",
        },
        label: {
          type: String,
          required: true,
        },
        required: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  DEFAULT_MODAL_TIMESTAMPTS,
);

export const FormType = mongoose.model<IFormType>("FormType", formTypeSchema);
