import express, { Request, Response } from "express";
import baseRoutes from "./routes";
import { CustomError } from "./utils/classes/customError";
import cors from "cors";

/**
 * Init express
 */
const app = express();

/**
 * Set basic express settings
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

/**
 * Root API
 */
app.get("/", async (req, res) => {
  function extractValues(text: string) {
    const pattern = /\{([^}]*)\}/g; // Regular expression to match curly braces and their content
    const matches = text.match(pattern);
    if (matches) {
      return matches.map((match: any) => match.slice(1, -1));
    } else {
      return [];
    }
  }

  console.log(
    extractValues("Hello My name is {firstName}} {lastName} {firstName}"),
  );

  res.send("Hello World");
});

/**
 * Routers
 */
app.use("/api/v1", baseRoutes);

/**
 * Error Handler
 */
app.use((err: CustomError, req: Request, res: Response) => {
  return res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Something looks wrong :( !!!" });
});

/**
 * Exporting express app instance
 */
export default app;
