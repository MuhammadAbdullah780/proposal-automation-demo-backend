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
    message: "Successfully fetched the Prompts",
  };
});

export const deletePrompt = requestHandler(async ({ raiseException, req }) => {
  const id: string = req?.params?.id;
  const repo = new DbRepository<IPrompt>(Prompt);

  const isDocExists = await repo?.isDocExits({
    filter: { _id: id },
  });

  if (!isDocExists) {
    raiseException(
      "The prompt you are trying to delete is not included in our database",
      httpStatus.NOT_FOUND,
    );
  }

  const deletedData = await Prompt.findByIdAndDelete(id);

  if (!deletedData) {
    raiseException("Error while deleting the data", httpStatus.NOT_IMPLEMENTED);
  }

  return {
    data: deletedData || {},
    message: "Record deleted successfully",
  };
});
