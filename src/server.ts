import express, { Request, Response } from "express";
import baseRoutes from "./routes";
import { OpenAIService } from "./services/openai";

/**
 * Init express
 */
const app = express();

/**
 * Set basic express settings
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Root API
 */
app.get("/", (req, res) => {
  console.log("MONGO___DB___URI", process.env.MONGO_URL);
  const ai = new OpenAIService();

  // ai.prepareConversationBuffer();

  res.send("Hello World");
});

/**
 * Routers
 */
app.use("/api/v1", baseRoutes);

/**
 * Error Handler
 */
app.use((err: any, req: Request, res: Response) => {
  return res.status(500).json({ message: "Something looks wrong :( !!!" });
});

/**
 * Exporting express app instance
 */
export default app;
