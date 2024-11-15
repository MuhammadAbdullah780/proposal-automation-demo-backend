import { Router } from "express";
// Routes
// import conversationRoutes from "./conversations.routes";
import submissionsRoutes from "./submissions.routes";
import referenceHistoryRoutes from "./referenceHistory.routes";
import promptRoutes from "./prompts.routes";

interface RoutesMapper {
  path: string;
  router: Router;
}

const router = Router();

const routesMapper: RoutesMapper[] = [
  // { path: "/conversations", router: conversationRoutes },
  { path: "/submissions", router: submissionsRoutes },
  { path: "/reference-history", router: referenceHistoryRoutes },
  { path: "/prompts", router: promptRoutes },
];

routesMapper.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
