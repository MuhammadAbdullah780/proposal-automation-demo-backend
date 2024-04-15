import { Router } from "express";
import {
  addConversationMessages,
  addNewConversation,
  fetchConversations,
} from "../controllers";
import { checkValidation } from "../middlewares/checkValidation";
import { AddConversationDto } from "../types/dtos/addConversation";

const routes = Router();

routes.post<any, any, any, AddConversationDto>(
  "/new",
  checkValidation("addConversation"),
  addNewConversation,
);
routes.get("/", fetchConversations);
routes.post("/add-messages", addConversationMessages);

export default routes;
