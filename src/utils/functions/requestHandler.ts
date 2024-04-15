import { Request, Response } from "express";
import { CustomError } from "../classes/customError";

type Handler<Payload> = (args: {
  req: Request;
  res: Response;
  raiseException: RaiseException;
}) => Promise<void | SuccessResponse<Payload>>;

type RaiseException = (msg: string, code: number) => Promise<any>;

type SuccessResponse<T> = {
  message: string;
  data: T;
  isSuccess: true;
};

export const requestHandler = <T extends Record<string, any> = any>(
  handler: Handler<T>,
) => {
  const executableFunc = async (req: Request, res: Response) => {
    let isException = false;

    const raiseException: RaiseException = async (
      msg: string,
      code: number,
    ) => {
      isException = true;
      const err = new CustomError({ msg, statusCode: code });
      return res.status(err.statusCode).json(err.serialize());
    };

    try {
      const handlerResponse = await handler({
        res,
        req,
        raiseException,
      });

      if (!isException) {
        return res.status(200).json({
          message: handlerResponse?.message,
          data: handlerResponse?.data,
          isSuccess: true,
        });
      }
    } catch (error: any) {
      const err = new CustomError({
        msg: error?.message,
        statusCode: error?.statusCode || 500,
      });
      return res.status(err.statusCode).json(err.serialize());
    }
  };

  return executableFunc;
};
