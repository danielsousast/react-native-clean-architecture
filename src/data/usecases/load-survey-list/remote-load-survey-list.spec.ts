import faker from '@faker-js/faker';
import {HttpGetClientSpy} from '@/data/test/mock-http';
import {RemoteLoadSurveyList} from './remote-load-survey-list';

describe('RemoteLoadSurveyList', () => {
  test('should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url();
    const httpGetClientSpy = new HttpGetClientSpy();
    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
    await sut.execute();
    expect(httpGetClientSpy.url).toBe(url);
  });
});
