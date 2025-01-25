import {Request, Response, NextFunction} from "express";

export function createErrorResponse(message: string = "", data?: any) {
  return ({
    status: 'error',
    message,
    data,
  })
}

export function createSuccessResponse(message: string = "", data?: any) {
  return ({
    status: 'success',
    message,
    data,
  })
}

export const formatResponse = (req: Request, res: Response, next: NextFunction) => {
  const originalSendFunction = res.json;

  res.json = function(body) {
    if (res.statusCode.toString().startsWith("2")) {
      body = createSuccessResponse(body)
    } else {
      body = createErrorResponse(body.toString())
    }
    return originalSendFunction.call(this, body);
  }

  next();
}