import faker from '@faker-js/faker';
import {HttpClientSpy} from '@/data/test';
import {RemoteSaveSurveyResult} from '@/data/usecases';
import {HttpStatusCode} from '@/data/protocols/http';
import {AccessDeniedError, UnexpectedError} from '@/domain/errors';
import {SurveyResultModel} from '@/domain/models';
import {mockSurveyResult} from '@/domain/test';

type SutTypes = {
  sut: RemoteSaveSurveyResult;
  httpClientSpy: HttpClientSpy<SurveyResultModel>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<SurveyResultModel>();
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteSaveSurveyResult', () => {
  test('should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const {sut, httpClientSpy} = makeSut(url);
    const saveSurveyResultParams = {answer: faker.random.words()};
    await sut.execute(saveSurveyResultParams);
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('put');
    expect(httpClientSpy.body).toEqual(saveSurveyResultParams);
  });

  test('should throw AccessDeniedError if HttpClient returns 403', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.execute({answer: faker.random.words()});
    expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test('should throw UnexpectedError if HttpClient returns 404', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.execute({answer: faker.random.words()});
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpClient returns 500', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.internalError,
    };
    const promise = sut.execute({answer: faker.random.words()});
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should return a SurveyResultModel if HttpClient returns 200', async () => {
    const {sut, httpClientSpy} = makeSut();
    const httpResult = mockSurveyResult();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.success,
      body: httpResult,
    };
    const surveyResult = await sut.execute({answer: faker.random.words()});
    expect(surveyResult).toEqual(httpResult);
  });

  test('should return undefined if HttpClient returns 204', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };
    const surveyList = await sut.execute({answer: faker.random.words()});
    expect(surveyList).toEqual(undefined);
  });
});
