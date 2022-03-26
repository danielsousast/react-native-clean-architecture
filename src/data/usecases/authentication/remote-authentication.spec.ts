import faker from '@faker-js/faker';
import {HttpPostClientSpy} from '../../test/mock-http-client';
import {RemoteAuthentication} from './remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClient: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClient = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClient);
  return {
    sut,
    httpPostClient,
  };
};

describe('RemoteAuthentication', () => {
  test('should call HHttpCliuent with with correct url', async () => {
    const url = faker.internet.url();
    const {sut, httpPostClient} = makeSut(url);
    sut.auth();
    expect(httpPostClient.url).toBe(url);
  });
});
