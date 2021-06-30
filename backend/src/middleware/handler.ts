import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ErrorHandler {
  [key: string]: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errors: ErrorHandler = {};

    err.inner.forEach((error) => {
      if (error.path) {
        errors[error.path] = error.errors;
      }
    });
    return res.status(400).json({ message: 'Validation Fail', errors });
  }

  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error' });
};
