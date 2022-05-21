import {HttpRequest} from '@/data/protocols/http';
import {GetStorageSpy, HttpClientSpy, mockHttpRequest} from '@/data/test';
import {mockAccountModel} from '@/domain/test';
import {AuthorizeHttpClientDecorator} from '@/main/decorators';
import faker from '@faker-js/faker';

type SutTypes = {
  sut: AuthorizeHttpClientDecorator;
  getStorageSpy: GetStorageSpy;
  httpClientSpy: HttpClientSpy<any>;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpClientSpy = new HttpClientSpy();
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy);

  return {
    sut,
    getStorageSpy,
    httpClientSpy,
  };
};

describe('AuthorizeHttpGetClientDecorator', () => {
  test('should get GetStorage with correct value', async () => {
    const {getStorageSpy, sut} = makeSut();
    await sut.request(mockHttpRequest());
    expect(getStorageSpy.key).toBe('account');
  });

  test('should not add headers if GetStorage is invalid', async () => {
    const {sut, httpClientSpy} = makeSut();
    const httpRequest: HttpRequest = {
      method: 'get',
      url: faker.internet.url(),
      headers: {
        field: faker.random.words(),
      },
    };
    await sut.request(httpRequest);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.headers).toEqual(httpRequest.headers);
  });

  test('should  add headers to HttpClient', async () => {
    const {sut, httpClientSpy, getStorageSpy} = makeSut();
    getStorageSpy.value = mockAccountModel();
    const httpRequest: HttpRequest = {
      method: 'get',
      url: faker.internet.url(),
    };
    await sut.request(httpRequest);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken,
    });
  });

  test('should  merge headers to HttpClient', async () => {
    const {sut, httpClientSpy, getStorageSpy} = makeSut();
    getStorageSpy.value = mockAccountModel();
    const field = faker.random.words();
    const httpRequest: HttpRequest = {
      method: 'get',
      url: faker.internet.url(),
      headers: {
        field,
      },
    };
    await sut.request(httpRequest);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken,
    });
  });

  test('should  return the same result to HttpClient', async () => {
    const {sut, httpClientSpy} = makeSut();
    const httpResponse = await sut.request(mockHttpRequest());
    expect(httpResponse).toEqual(httpClientSpy.response);
  });
});
