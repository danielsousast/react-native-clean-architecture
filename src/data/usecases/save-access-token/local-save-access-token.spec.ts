import {SetStorageMock} from '@/data/test/mock-storage';
import faker from '@faker-js/faker';
import {LocalSaveAccessToken} from './local-save-access-token';

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorage: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorage = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorage);

  return {
    sut,
    setStorage,
  };
};

describe('LocalSaveAccessToken', () => {
  test('should call set Storage with correct value', () => {
    const {sut, setStorage} = makeSut();
    const accessToken = faker.random.words();
    sut.save(accessToken);
    expect(setStorage.key).toBe('accessToken');
    expect(setStorage.value).toBe(accessToken);
  });
});
