import faker from '@faker-js/faker';
import {
  HttpPostClient,
  HttpPostParams,
} from '@/data/protocols/http/http-post-client';
import {
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http/http-response';

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.word(),
});

export class HttpPostClientSpy<ResponseType>
  implements HttpPostClient<ResponseType>
{
  url?: string;
  body?: any;
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.success,
  };

  async post(params: HttpPostParams): Promise<HttpResponse<ResponseType>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}
