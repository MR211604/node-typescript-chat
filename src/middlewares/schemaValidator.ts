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
        //Al ser el mismo error, siempre va a ser el primer elemento
        const errores = error.issues.map((issue) => issue.message)
        return res.status(400).json({ ok: false, message: errores[0] })
      } else {
        return res.status(500).json({ ok: false, message: 'Internal Server Error' });
      }
    }
  }
}