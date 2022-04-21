import faker from '@faker-js/faker';
import {
  HttpPostClient,
  HttpPostParams,
} from '@/data/protocols/http/http-post-client';
import {
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http/http-response';

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.word(),
});

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.success,
  };

  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}
