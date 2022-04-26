import axios from 'axios';
import {mockGetRequest, mockPostRequest} from '@/data/test/mock-http';
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
  test('should call axios.post with correct values', async () => {
    const request = mockPostRequest();
    const {sut, mockedAxios} = makeSut();
    sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('should return correct response on axios.post', async () => {
    const request = mockPostRequest();
    const {sut, mockedAxios} = makeSut();
    const httpResponse = await sut.post(request);
    const axiosResponse = await mockedAxios.post.mock.results[0]?.value;
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });

  test('should call axios.get with correct values', async () => {
    const request = mockGetRequest();
    const {sut, mockedAxios} = makeSut();
    sut.get(request);
    expect(mockedAxios.get).toHaveBeenCalledWith(request.url);
  });

  test('should return correct response on axios.get', async () => {
    const request = mockGetRequest();
    const {sut, mockedAxios} = makeSut();
    const httpResponse = await sut.get(request);
    const axiosResponse = await mockedAxios.get.mock.results[0].value;
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });
});
