import faker from '@faker-js/faker';
import {
  HttpPostClient,
  HttpPostParams,
} from '@/data/protocols/http/http-post-client';
import {
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http/http-response';
import {HttpGetClient, HttpGetParams} from '../protocols/http/http-get-client';

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

export class HttpGetClientSpy implements HttpGetClient {
  url: string = '';

  async get(params: HttpGetParams): Promise<void> {
    this.url = params.url;
  }
}
