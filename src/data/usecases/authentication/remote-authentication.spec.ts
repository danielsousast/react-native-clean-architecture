import {HttpPostClient} from '../../protocols/http/http-post-client';
import {RemoteAuthentication} from './remote-authentication';

class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  async post(url: string): Promise<void> {
    this.url = url;
    return Promise.resolve();
  }
}

describe('RemoteAuthentication', () => {
  test('should call HHttpCliuent with with correct url', async () => {
    const url = 'any_url';
    const httpPostClient = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClient);
    sut.auth();
    expect(httpPostClient.url).toBe(url);
  });
});
