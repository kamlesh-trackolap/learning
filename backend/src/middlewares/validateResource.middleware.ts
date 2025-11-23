import type { NextFunction, Request, Response } from 'express';
import { any, ZodError } from 'zod';

interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export const validate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors: ValidationError[] = error.issues.map(issue => ({
          field: issue.path.join('.') || 'root',
          message: issue.message,
          code: issue.code
        }));

        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: validationErrors
        });
      }

      return res.status(500).json({
        status: 'error',
        message: 'Internal server error during validation'
      });
    }
  };
};