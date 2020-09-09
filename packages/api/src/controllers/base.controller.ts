import { Router } from 'express';
import { BaseController as IBaseController } from 'interfaces';

export abstract class BaseController implements IBaseController {
  public readonly router = Router();
  public readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  protected abstract initializeRoutes(): void;
}
