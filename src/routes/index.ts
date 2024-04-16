import { Router } from "express";
// Routes
// import conversationRoutes from "./conversations.routes";
import submissionsRoutes from "./submissions.routes";
// import messageRoutes from "./message.routes";
import referenceHistoryRoutes from "./referenceHistory.routes";

interface RoutesMapper {
  path: string;
  router: Router;
}

const router = Router();

const routesMapper: RoutesMapper[] = [
  // { path: "/conversations", router: conversationRoutes },
  { path: "/submissions", router: submissionsRoutes },
  // { path: "/conversations/:id/message", router: messageRoutes },
  { path: "/reference-history", router: referenceHistoryRoutes },
];

routesMapper.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
