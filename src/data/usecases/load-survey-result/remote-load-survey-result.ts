import {HttpGetClient, HttpStatusCode} from '@/data/protocols/http';
import {AccessDeniedError, UnexpectedError} from '@/domain/errors';
import {SurveyResultModel} from '@/domain/models';
import {LoadSurveyResult} from '@/domain/usecases';

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  callsCount: number = 0;
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<
      SurveyResultModel | undefined
    >,
  ) {}

  async execute(): Promise<SurveyResultModel | undefined> {
    const response = await this.httpGetClient.get({url: this.url});

    switch (response.statusCode) {
      case HttpStatusCode.success:
        return response.body;
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCode.noContent:
        return undefined;
      default:
        throw new UnexpectedError();
    }
  }
}
