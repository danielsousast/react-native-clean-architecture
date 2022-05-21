import faker from '@faker-js/faker';
import {HttpClientSpy} from '@/data/test';
import {RemoteLoadSurveyList} from '@/data/usecases';
import {HttpStatusCode} from '@/data/protocols/http';
import {AccessDeniedError, UnexpectedError} from '@/domain/errors';
import {SurveyModel} from '@/domain/models';
import {mockSurveyList} from '@/domain/test';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpClientSpy: HttpClientSpy<SurveyModel[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<SurveyModel[]>();
  const sut = new RemoteLoadSurveyList(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteLoadSurveyList', () => {
  test('should call HttpClient with correct url', async () => {
    const url = faker.internet.url();
    const {sut, httpClientSpy} = makeSut(url);
    await sut.execute();
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });

  test('should throw AccessDeniedError if HttpClient returns 403', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.execute();
    expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test('should throw UnexpectedError if HttpClient returns 404', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.execute();
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpClient returns 500', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.internalError,
    };
    const promise = sut.execute();
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should return a list of SurveyModels if HttpClient returns 200', async () => {
    const {sut, httpClientSpy} = makeSut();
    const httpResult = mockSurveyList();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.success,
      body: httpResult,
    };
    const surveyList = await sut.execute();
    expect(surveyList).toEqual(httpResult);
  });

  test('should return an empty list if HttpClient returns 204', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };
    const surveyList = await sut.execute();
    expect(surveyList).toEqual([]);
  });
});
