import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Response {
      sendSuccess: (data: any, message?: string, meta?: any) => void;
      sendFail: (message: string, code?: number, data?: any) => void;
      sendError: (message: string, code?: number, data?: any) => void;
    }
  }
}

const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.sendSuccess = (data: any, message = 'Success', meta?: any) => {
    res.status(200).json({
      status: 'success',
      message,
      data,
      meta: meta || undefined,
    });
  };

  res.sendFail = (message = 'Fail', code = 400, data: any = null) => {
    res.status(code).json({
      status: 'fail',
      message,
      data,
    });
  };

  res.sendError = (message = 'Internal Server Error', code = 500, data: any = null) => {
    res.status(code).json({
      status: 'error',
      message,
      data,
    });
  };

  next();
};

export default responseHandler;