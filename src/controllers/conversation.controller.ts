import { Message } from "../models/message";
import { AddConversationDto } from "../types/dtos/addConversation";
import { requestHandler } from "../utils/functions/requestHandler";

export const addNewConversation = requestHandler(async ({ req }) => {
  const body: AddConversationDto = req.body;
  console.log(body);

  const insertedDocs = await Message.insertMany(body.messages);
  console.log(insertedDocs, "Inserted___Docs___");

  return {
    data: {},
    message: "",
  };
});

export const fetchConversations = requestHandler(async () => {
  return {
    data: {},
    message: "",
  };
});

export const addConversationMessages = requestHandler(async () => {
  return {
    data: {},
    message: "",
  };
});
