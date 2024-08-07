import { NextFunction, Request, Response } from "express"
import { AnyZodObject, ZodError } from "zod"

export function schemaValidator(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);      
      next();
      return;
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ ok: false, messages: error.issues.map((issue) => ({ message: issue })) })
      } else {
        return res.status(500).json({ ok: false, message: 'Internal Server Error' });
      }
    }
  }
}