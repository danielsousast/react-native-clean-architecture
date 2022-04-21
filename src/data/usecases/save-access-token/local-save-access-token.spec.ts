import {SetStorageSpy} from '@/data/test/mock-storage';
import faker from '@faker-js/faker';
import {LocalSaveAccessToken} from './local-save-access-token';

describe('LocalSaveAccessToken', () => {
  test('should call set Storage with correct value', () => {
    const setStorage = new SetStorageSpy();
    const sut = new LocalSaveAccessToken(setStorage);
    const accessToken = faker.random.words();
    sut.save(accessToken);
    expect(setStorage.key).toBe('accessToken');
    expect(setStorage.value).toBe(accessToken);
  });
});
