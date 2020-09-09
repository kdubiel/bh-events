import { NextFunction, Request, RequestHandler, Response } from 'express';
import i18n from 'i18next';
import { HttpException } from 'utils';

export const i18nMiddleware = (): RequestHandler => (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const lang = req.acceptsLanguages('pl') || 'en';

    const instance = i18n.cloneInstance();

    instance.changeLanguage(lang);

    const t = instance.t.bind(instance);

    req.t = t;
    req.lang = lang;

    next();
  } catch (error) {
    next(new HttpException(error, 500));
  }
};
