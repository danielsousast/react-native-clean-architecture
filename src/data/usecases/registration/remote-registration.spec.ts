import faker from '@faker-js/faker';
import {mockAccountModel, mockRegistration} from '@/domain/test';
import {HttpClientSpy} from '@/data/test';
import {HttpStatusCode} from '@/data/protocols/http';
import {UnexpectedError, EmailInUseError} from '@/domain/errors';
import {AccountModel} from '@/domain/models/account-model';
import {RemoteRegistration} from './remote-registration';

type SutTypes = {
  sut: RemoteRegistration;
  httpClientSpy: HttpClientSpy<AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<AccountModel>();
  const sut = new RemoteRegistration(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteRegistration', () => {
  test('should call HHttpClient with correct url', async () => {
    const url = faker.internet.url();
    const {sut, httpClientSpy} = makeSut(url);
    sut.execute(mockRegistration());
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('post');
  });

  test('should call HHttpClient with correct body', async () => {
    const {sut, httpClientSpy} = makeSut();
    const registrationParams = mockRegistration();
    sut.execute(registrationParams);
    expect(httpClientSpy.body).toEqual(registrationParams);
  });

  test('should throw EmailInUseError if HttpClient returns 403', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.execute(mockRegistration());
    expect(promise).rejects.toThrow(new EmailInUseError());
  });

  test('should throw UnexpectedError if HttpClient returns 400', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.execute(mockRegistration());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpClient returns 500', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.internalError,
    };
    const promise = sut.execute(mockRegistration());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpClient returns 404', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.execute(mockRegistration());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should return an AccountModel if HttpClient returns 200', async () => {
    const {sut, httpClientSpy} = makeSut();
    const httpResult = mockAccountModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.success,
      body: httpResult,
    };
    const account = await sut.execute(mockRegistration());
    expect(account).toEqual(httpResult);
  });
});
