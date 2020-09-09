import { Request, Response, NextFunction } from 'express';
import { HttpException } from 'utils';

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { t = () => 'Internal server error.' } = req;

  const responseObject =
    error instanceof HttpException
      ? error.getResponseObject(t)
      : {
          status: 500,
          message: t('errors:status:500'),
        };

  res.status(responseObject.status).send(responseObject);
};
