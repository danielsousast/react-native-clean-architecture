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

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: faker.random.objectElement({key: 'value'}),
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

export class HttpGetClientSpy<ResponseType> implements HttpGetClient {
  url: string = '';
  headers?: any;
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.success,
  };

  async get(params: HttpGetParams): Promise<HttpResponse<ResponseType>> {
    this.url = params.url;
    this.headers = params.headers;
    return Promise.resolve(this.response);
  }
}
