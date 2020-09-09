import { BaseController } from 'controllers/base.controller';
import { Controller } from 'interfaces';
import { EventService } from 'services';
import { Request, Response, NextFunction } from 'express';
import { validationMiddleware } from 'middlewares';
import { BaseEventFormSchema } from '@project/validators';

export class EventController extends BaseController implements Controller {
  private eventService: EventService;

  constructor(path: string) {
    super(path);

    this.eventService = new EventService();
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router
      .get('/', this.getEvents)
      .get('/:id', this.getEventById)
      .post(
        '/',
        validationMiddleware(BaseEventFormSchema(), 'data'),
        this.createEvent
      );
  }

  public getEvents = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const events = await this.eventService.getList();

      res.status(200).send(events);
    } catch (error) {
      next(error);
    }
  };

  public getEventById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const foundEvent = await this.eventService.getOne(id);

      res.status(200).send(foundEvent);
    } catch (error) {
      next(error);
    }
  };

  public createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { data } = req.body;

      const createdEvent = await this.eventService.create(data);

      res.status(200).send(createdEvent);
    } catch (error) {
      next(error);
    }
  };
}
