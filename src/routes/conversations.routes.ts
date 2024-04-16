import { Router } from "express";
import { checkValidation } from "../middlewares/checkValidation";
import {
  addConversationMessages,
  addNewConversation,
  fetchConversations,
} from "../controllers/conversation.controller";

const routes = Router();

routes.post("/new", checkValidation("addConversation"), addNewConversation);
routes.get("/", fetchConversations);
routes.post("/add-messages", addConversationMessages);

export default routes;
