import { NextFunction, Request, Response } from "express";
import { validators } from "../validations/index";
import httpStatus from "http-status";

export const checkValidation = (target: keyof typeof validators) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log({
        target,
        body: req.body,
        // parsed: JSON.parse(req.body),
      });
      const validated = await validators[target].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err: any) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: err?.message || "Error Occured while validating request body",
      });
    }
  };
};
