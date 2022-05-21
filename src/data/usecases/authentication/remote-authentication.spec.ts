import faker from '@faker-js/faker';
import {mockAccountModel, mockAuthentication} from '@/domain/test';
import {HttpClientSpy} from '@/data/test/mock-http';
import {RemoteAuthentication} from '@/data/usecases';
import {InvalidCredentialsError} from '@/domain/errors';
import {UnexpectedError} from '@/domain/errors/UnexpectedError';
import {AccountModel} from '@/domain/models/account-model';
import {HttpStatusCode} from '@/data/protocols/http';

type SutTypes = {
  sut: RemoteAuthentication;
  httpClientSpy: HttpClientSpy<AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<AccountModel>();
  const sut = new RemoteAuthentication(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  test('should call HHttpClient with correct url and method', async () => {
    const url = faker.internet.url();
    const {sut, httpClientSpy} = makeSut(url);
    sut.auth(mockAuthentication());
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('post');
  });

  test('should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('should throw UnexpectedError if HttpClient returns 400', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if httpClient returns 500', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.internalError,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpClient returns 404', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should return an AccountModel if HttpClient returns 200', async () => {
    const {sut, httpClientSpy} = makeSut();
    const httpResult = mockAccountModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.success,
      body: httpResult,
    };
    const account = await sut.auth(mockAuthentication());
    expect(account).toEqual(httpResult);
  });
});
