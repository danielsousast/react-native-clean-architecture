import {HttpGetClient, HttpStatusCode} from '@/data/protocols/http';
import {UnexpectedError} from '@/domain/errors';

export class RemoteLoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async execute() {
    const response = await this.httpGetClient.get({url: this.url});

    switch (response.statusCode) {
      case HttpStatusCode.success:
        return response.body;
      case HttpStatusCode.forbidden:
        throw new UnexpectedError();
      default:
        throw new UnexpectedError();
    }
  }
}
