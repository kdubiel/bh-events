import { RequestHandler, Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { ObjectSchema } from '@project/validators';
import { HttpException } from 'utils';

export const validationMiddleware = (
  yupSchema: ObjectSchema,
  path?: string
): RequestHandler => (req: Request, _res: Response, next: NextFunction) => {
  yupSchema
    .validate(path ? get(req.body, path) : req.body)
    .then(() => {
      next();
    })
    .catch(error => {
      next(new HttpException(error, 400));
    });
};
