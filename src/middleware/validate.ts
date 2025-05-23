import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      schema.parse(req.body);
      return next();
    } catch (e: any) {
      console.error(e.errors);
      return res.status(400).send(
        e.errors.map((error: any) => {
          return {
            message: error.message,
          };
        })
      );
    }
  };
