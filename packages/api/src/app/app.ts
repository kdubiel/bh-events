/* eslint-disable no-console */
import { Controller } from 'interfaces';
import { ExpressProxy, DatabaseProxy } from 'app';
import i18n from 'i18next';
import { en_api, pl_api } from '@project/locales';

export class Application {
  private readonly express: ExpressProxy;
  private readonly dbProxy: DatabaseProxy;

  constructor(controllers: Controller[], connectToDB: boolean = true) {
    this.initializeInternationalization();
    this.express = new ExpressProxy(controllers);
    this.dbProxy = new DatabaseProxy();

    if (connectToDB) this.dbProxy.connect();
  }

  private initializeInternationalization() {
    i18n.init({
      fallbackLng: 'en',
      lng: 'en',
      preload: ['en', 'pl'],
      debug: false,
      resources: {
        en: en_api,
        pl: pl_api,
      },
    });
  }

  public start(port: number = Number(process.env.PORT) || 4000) {
    return this.express.instance.listen(port, () => {
      console.log(`Listening on ${port}...`);
    });
  }
}
