import faker from '@faker-js/faker';
import axios from 'axios';

const object = {keyA: 'valueA', keyB: 42};

export const mockHttpResponse = (): any => ({
  status: faker.random.objectElement(object),
  data: faker.random.objectElement(object),
});

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse);
  return mockedAxios;
};
