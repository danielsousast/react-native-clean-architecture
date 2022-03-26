import faker from '@faker-js/faker';
import {mockAuthentication} from '@/domain/test/mock-authentication';
import {HttpPostClientSpy} from '@/data/test/mock-http-client';
import {RemoteAuthentication} from '@/data/usecases/authentication/remote-authentication';

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
    sut.auth(mockAuthentication());
    expect(httpPostClient.url).toBe(url);
  });

  test('should call HHttpCliuent with with correct body', async () => {
    const {sut, httpPostClient} = makeSut();
    const authenticationParams = mockAuthentication();
    sut.auth(authenticationParams);
    expect(httpPostClient.body).toEqual(authenticationParams);
  });
});
