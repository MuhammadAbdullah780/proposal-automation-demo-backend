import { Types } from "mongoose";

export {};

declare global {
  type MongoID = Types.ObjectId | string;

  // Extends
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string;
      PORT: string | number;
      OPENAI_API_KEY: string;
      GEMINI_API_KEY: string;
      PINECONE_INDEX: string;
      PINECONE_DIMENSIONS: string;
      PINECONE_API_KEY: string;
      PINECONE_ENVIRONMENT: string;
    }
  }

  interface RequestWithUser extends Request {}
}
