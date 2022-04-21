import {SetStorageMock} from '@/data/test/mock-storage';
import faker from '@faker-js/faker';
import {LocalSaveAccessToken} from './local-save-access-token';

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);

  return {
    sut,
    setStorageMock,
  };
};

describe('LocalSaveAccessToken', () => {
  test('should call set Storage with correct value', async () => {
    const {sut, setStorageMock} = makeSut();
    const accessToken = faker.random.words();
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe('accessToken');
    expect(setStorageMock.value).toBe(accessToken);
  });

  /*   test('should throw if Storage throws', async () => {
    const {sut, setStorageMock} = makeSut();
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(() => {
      return new Error();
    });
    const promise = sut.save(faker.random.words());
    await expect(promise).rejects.toThrow(new Error());
  }); */
});
