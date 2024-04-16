import { Router } from "express";

const routes = Router();

routes.get("/new", (req, res) => {
  res.send("Hello From Conversations");
});

export default routes;
