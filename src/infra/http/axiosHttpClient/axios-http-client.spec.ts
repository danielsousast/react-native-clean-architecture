import axios from 'axios';
import {mockHttpRequest} from '@/data/test/mock-http';
import {mockAxios} from '@/infra/test/mock-axios';
import {AxiosHttpClient} from './axios-http-client';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};
const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe('AxiosHttpClient', () => {
  test('should call axios with correct values', async () => {
    const request = mockHttpRequest();
    const {sut, mockedAxios} = makeSut();
    sut.request(request);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method,
    });
  });

  test('should return correct response on axios', async () => {
    const request = mockHttpRequest();
    const {sut, mockedAxios} = makeSut();
    const httpResponse = await sut.request(request);
    const axiosResponse = await mockedAxios.request.mock.results[0]?.value;
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });
});
