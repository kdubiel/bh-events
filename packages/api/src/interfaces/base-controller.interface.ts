import { IRouter } from 'express';

export interface BaseController {
  path: string;
  router: IRouter;
}
