import faker from '@faker-js/faker';
import {mockAccountModel, mockAuthentication} from '@/domain/test/mock-account';
import {HttpPostClientSpy} from '@/data/test/mock-http';
import {RemoteAuthentication} from '@/data/usecases/authentication/remote-authentication';
import {InvalidCredentialsError} from '@/domain/errors/InvalidCredentialsError';
import {HttpStatusCode} from '@/data/protocols/http/http-response';
import {UnexpectedError} from '@/domain/errors/UnexpectedError';
import {AccountModel} from '@/domain/models/account-model';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClient: HttpPostClientSpy<AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClient = new HttpPostClientSpy<AccountModel>();
  const sut = new RemoteAuthentication(url, httpPostClient);
  return {
    sut,
    httpPostClient,
  };
};

describe('RemoteAuthentication', () => {
  test('should call HHttpClient with correct url', async () => {
    const url = faker.internet.url();
    const {sut, httpPostClient} = makeSut(url);
    sut.auth(mockAuthentication());
    expect(httpPostClient.url).toBe(url);
  });

  test('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const {sut, httpPostClient} = makeSut();
    httpPostClient.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const {sut, httpPostClient} = makeSut();
    httpPostClient.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const {sut, httpPostClient} = makeSut();
    httpPostClient.response = {
      statusCode: HttpStatusCode.internalError,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const {sut, httpPostClient} = makeSut();
    httpPostClient.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should return an AccountModel if HttpPostClient returns 200', async () => {
    const {sut, httpPostClient} = makeSut();
    const httpResult = mockAccountModel();
    httpPostClient.response = {
      statusCode: HttpStatusCode.success,
      body: httpResult,
    };
    const account = await sut.auth(mockAuthentication());
    expect(account).toEqual(httpResult);
  });
});
