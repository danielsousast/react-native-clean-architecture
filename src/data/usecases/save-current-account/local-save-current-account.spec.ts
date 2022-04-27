import {SetStorageMock} from '@/data/test/mock-cache';
import faker from '@faker-js/faker';
import {LocalSaveCurrentAccount} from './local-save-current-account';

type SutTypes = {
  sut: LocalSaveCurrentAccount;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveCurrentAccount(setStorageMock);

  return {
    sut,
    setStorageMock,
  };
};

describe('LocalSaveCurrentAccount', () => {
  test('should call set Storage with correct value', async () => {
    const {sut, setStorageMock} = makeSut();
    const account = {
      name: faker.random.words(),
      accessToken: faker.random.words(),
    };
    await sut.save(account);
    expect(setStorageMock.key).toBe('account');
    expect(setStorageMock.value).toBe(JSON.stringify(account));
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
