import { AddConversationDto } from "../types/dtos/addConversation";
import { requestHandler } from "../utils/functions/requestHandler";

export const addNewConversation = requestHandler(async ({ req }) => {
  const body: AddConversationDto = req.body;
  console.log(body);
});

export const fetchConversations = requestHandler(async () => {});

export const addConversationMessages = requestHandler(async () => {});
