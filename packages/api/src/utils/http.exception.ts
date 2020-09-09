import { TFunction } from 'i18next';

export class HttpException extends Error {
  public status: number;
  public secureMessage: string | undefined;

  constructor(error?: Error, status?: number, message?: string) {
    super(error?.message);

    this.status = status || 500;
    this.secureMessage = message;
  }

  private generateErrorMessage() {
    return this.secureMessage || `errors:status:${this.status}`;
  }

  public getResponseObject(t: TFunction) {
    return {
      status: this.status,
      message: t(this.generateErrorMessage()),
    };
  }
}
