import faker from '@faker-js/faker';
import {
  HttpClient,
  HttpMethod,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '../protocols/http';

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  body: faker.random.objectElement({key: 'value'}),
  headers: faker.random.objectElement({key: 'value'}),
  method: faker.random.arrayElement(['get', 'post', 'delete', 'put']),
});

export class HttpClientSpy<ResponseType> implements HttpClient<ResponseType> {
  url?: string;
  method?: HttpMethod;
  headers?: any;
  body?: any;
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.success,
  };

  async request(params: HttpRequest): Promise<HttpResponse<ResponseType>> {
    this.url = params.url;
    this.body = params.body;
    this.method = params.method;
    this.headers = params.headers;
    return Promise.resolve(this.response);
  }
}
