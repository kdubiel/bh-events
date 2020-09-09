// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TFunction } from 'i18next';

declare global {
  namespace Express {
    interface Request {
      t: TFunction;
      lang: string;
    }
  }
}

export {};
