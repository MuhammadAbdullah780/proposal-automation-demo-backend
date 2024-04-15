import { Types } from "mongoose";

export {};

declare global {
  type MongoID = Types.ObjectId | string;

  // Extends
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL?: string;
      PORT?: string | number;
    }
  }

  interface RequestWithUser extends Request {}
}
