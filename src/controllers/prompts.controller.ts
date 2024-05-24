import httpStatus from "http-status";
import { IPrompt, Prompt } from "../models/prompts";
import { DbRepository } from "../services/dbRepository";
import { requestHandler } from "../utils/functions/requestHandler";

export const createPrompt = requestHandler(async ({ req, raiseException }) => {
  const repo = new DbRepository<IPrompt>(Prompt);
  const body: IPrompt = req?.body;

  // Check if Prompt with the specific title exists
  const isExists = await repo?.isDocExits({
    filter: {
      title: new RegExp(body?.title, "i"),
    },
  });

  if (isExists) {
    raiseException(
      "Prompt with that specific title already exists",
      httpStatus.CONFLICT,
    );
  }

  const createdDoc = await Prompt.create(body);

  return {
    data: createdDoc,
    message: "",
  };
});

export const fetchPrompts = requestHandler(async ({ raiseException }) => {
  const data = await Prompt.find();

  if (!data?.length) {
    raiseException(
      "No Prompt Template Found in our record",
      httpStatus.NOT_FOUND,
    );
  }

  return {
    data,
    message: "",
  };
});
