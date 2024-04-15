import { Response, Request } from "express";
import { CustomError } from "../utils/classes/customError";

export const errorHandler = (
  err: CustomError | Error,
  req: Request,
  res: Response,
) => {
  console.log("INSIDE__ERROR_____HANDLER");

  if (err instanceof CustomError) {
    return res.status(err?.statusCode).json(err.serialize());
  } else {
    return res.status(500).send("Internal Server Error");
  }
};
