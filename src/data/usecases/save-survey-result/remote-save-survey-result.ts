import {HttpClient, HttpStatusCode} from '@/data/protocols/http';
import {AccessDeniedError, UnexpectedError} from '@/domain/errors';
import {SurveyResultModel} from '@/domain/models';
import {SaveSurveyResult, SaveSurveyResultParams} from '@/domain/usecases';

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  callsCount: number = 0;
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<SurveyResultModel | undefined>,
  ) {}

  async execute(
    params: SaveSurveyResultParams,
  ): Promise<SurveyResultModel | undefined> {
    const response = await this.httpClient.request({
      method: 'put',
      url: this.url,
      body: params,
    });

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
