import {HttpPostClientSpy} from '../../test/mock-http-client';
import {RemoteAuthentication} from './remote-authentication';

describe('RemoteAuthentication', () => {
  test('should call HHttpCliuent with with correct url', async () => {
    const url = 'any_url';
    const httpPostClient = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClient);
    sut.auth();
    expect(httpPostClient.url).toBe(url);
  });
});
