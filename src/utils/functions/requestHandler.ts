import { Request, Response } from "express";
import { CustomError } from "../classes/customError";

type Handler<Payload> = (args: {
  req: Request;
  res: Response;
  raiseException: RaiseException;
}) => Promise<SuccessResponse<Payload>>;

type RaiseException = (msg: string, code: number) => Promise<any>;

type SuccessResponse<T> = {
  message: string;
  data: T;
  isSuccess?: true;
};

type RequestHandlerOptions = {
  responseStatus?: number;
};

export const requestHandler = <T extends Record<string, any> = any>(
  handler: Handler<T>,
  { responseStatus = 200 }: RequestHandlerOptions = {},
) => {
  const executableFunc = async (req: any, res: any) => {
    // console.log(res?.status(200).json({ mesg: "fd" }), "RESPONSE_________");
    let isException = false;

    const raiseException: RaiseException = async (
      msg: string,
      code: number,
    ) => {
      isException = true;
      const err = new CustomError({ msg, statusCode: code });
      res.status(err.statusCode).json(err.serialize());
    };

    try {
      const {
        data,
        message,
        isSuccess = true,
      } = await handler({
        res,
        req,
        raiseException,
      });

      if (!isException) {
        return res.status(responseStatus).json({
          message,
          data,
          isSuccess,
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
