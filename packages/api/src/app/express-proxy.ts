import express, { RequestHandler } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Controller } from 'interfaces';
import { errorMiddleware, i18nMiddleware } from 'middlewares';

export class ExpressProxy {
  public readonly instance: express.Application;

  constructor(controllers: Controller[]) {
    this.instance = express();

    this.initializeMiddlewares();
    this.initializei18nMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorMiddleware();
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(({ path, router }) => {
      this.instance.use(path, router);
    });
  }

  private initializeMiddlewares() {
    const middlewares: RequestHandler[] = [cors(), helmet(), express.json()];

    this.instance.use(middlewares);
  }

  private initializeErrorMiddleware() {
    this.instance.use(errorMiddleware);
  }

  private initializei18nMiddleware() {
    this.instance.use(i18nMiddleware());
  }
}
