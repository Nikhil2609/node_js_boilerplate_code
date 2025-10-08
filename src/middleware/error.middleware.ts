import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../utils/responseHelper';
import { STATUS_CODE } from '../utils/enum';
import { isCelebrateError } from 'celebrate';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('error=> ', err);
  console.error('error stack=> ', err?.stack);
  console.error('error message=> ', err?.message);

  // celebrate error handler
  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body'); // For body validation errors
    const errorParams = err.details.get('params'); // For params validation errors
    const errorQuery = err.details.get('query'); // For query validation errors

    const details = errorBody || errorParams || errorQuery;

    let errorMessage = details?.details[0]?.message || '';
    errorMessage = errorMessage.replace(/\"/g, '');
    return ErrorResponse(res, STATUS_CODE.BAD_REQUEST, errorMessage);
  }

  const error = err?.message || 'Internal Server Error';
  return ErrorResponse(res, STATUS_CODE.SERVER_ERROR, error);
};
