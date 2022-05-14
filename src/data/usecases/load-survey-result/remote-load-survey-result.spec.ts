import faker from '@faker-js/faker';
import {HttpGetClientSpy} from '@/data/test';
import {RemoteLoadSurveyResult} from '@/data/usecases';
import {HttpStatusCode} from '@/data/protocols/http';
import {AccessDeniedError, UnexpectedError} from '@/domain/errors';
import {SurveyResultModel} from '@/domain/models';
import {mockSurveyResult} from '@/domain/test';

type SutTypes = {
  sut: RemoteLoadSurveyResult;
  httpGetClientSpy: HttpGetClientSpy<SurveyResultModel>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyResultModel>();
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);

  return {
    sut,
    httpGetClientSpy,
  };
};

describe('RemoteLoadSurveyList', () => {
  test('should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url();
    const {sut, httpGetClientSpy} = makeSut(url);
    await sut.execute();
    expect(httpGetClientSpy.url).toBe(url);
  });

  test('should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const {sut, httpGetClientSpy} = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.execute();
    expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test('should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const {sut, httpGetClientSpy} = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.execute();
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const {sut, httpGetClientSpy} = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.internalError,
    };
    const promise = sut.execute();
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should return a SurveyResultModel if HttpPostClient returns 200', async () => {
    const {sut, httpGetClientSpy} = makeSut();
    const httpResult = mockSurveyResult();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.success,
      body: httpResult,
    };
    const surveyResult = await sut.execute();
    expect(surveyResult).toEqual(httpResult);
  });

  test('should return undefined if HttpPostClient returns 204', async () => {
    const {sut, httpGetClientSpy} = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };
    const surveyList = await sut.execute();
    expect(surveyList).toEqual(undefined);
  });
});
