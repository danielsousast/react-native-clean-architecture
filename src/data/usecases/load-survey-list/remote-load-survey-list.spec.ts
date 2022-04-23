import faker from '@faker-js/faker';
import {HttpGetClientSpy} from '@/data/test';
import {RemoteLoadSurveyList} from './remote-load-survey-list';
import {HttpStatusCode} from '@/data/protocols/http';
import {UnexpectedError} from '@/domain/errors';
import {SurveyModel} from '@/domain/models';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>();
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);

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

  test('should throw UnexpectedError if HttpGetClient returns 403', async () => {
    const {sut, httpGetClientSpy} = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.execute();
    expect(promise).rejects.toThrow(new UnexpectedError());
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
});
