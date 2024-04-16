import mongoose from "mongoose";
import { IReferenceHistory } from "../models/referenceHistory";

type AppSchema = {
  __v: 0;
  _id: mongoose.Types.ObjectId | string;
  created_at: Date | string;
  updated_at: Date | string;
};

/**
 * Mongoose Schema Types
 */
export type ReferenceHistorySchema = AppSchema & IReferenceHistory;
