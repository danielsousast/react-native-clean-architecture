import {HttpPostParams} from '@/data/protocols/http/http-post-client';
import faker from '@faker-js/faker';
import axios from 'axios';
import {AxiosHttpClient} from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.word(),
});

describe('AxiosHttpClient', () => {
  test('should call axios with correct values', async () => {
    const request = mockPostRequest();
    const sut = new AxiosHttpClient();
    sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });
});
