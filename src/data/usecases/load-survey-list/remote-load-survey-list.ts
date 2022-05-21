import {HttpClient, HttpStatusCode} from '@/data/protocols/http';
import {AccessDeniedError, UnexpectedError} from '@/domain/errors';
import {SurveyModel} from '@/domain/models';
import {LoadSurveyList} from '@/domain/usecases';

export class RemoteLoadSurveyList implements LoadSurveyList {
  callsCount: number = 0;
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<SurveyModel[] | undefined>,
  ) {}

  async execute(): Promise<SurveyModel[] | undefined> {
    const response = await this.httpClient.request({
      method: 'get',
      url: this.url,
    });

    switch (response.statusCode) {
      case HttpStatusCode.success:
        return response.body;
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCode.noContent:
        return [];
      default:
        throw new UnexpectedError();
    }
  }
}
