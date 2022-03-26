import faker from '@faker-js/faker';
import axios from 'axios';

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const object = {keyA: 'valueA', keyB: 42};
  const mockedAxiosResult = {
    status: faker.random.objectElement(object),
    data: faker.random.objectElement(object),
  };
  mockedAxios.post.mockResolvedValue(mockedAxiosResult);
  return mockedAxios;
};
