import faker from '@faker-js/faker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalStorageAdapter} from './local-storage-adapter';

describe('LocalStorageAdapter', () => {
  test('should call AsyncStorage with correct values', async () => {
    const sut = new LocalStorageAdapter();
    const key = faker.database.column();
    const value = faker.random.word();
    await sut.set(key, value);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, value);
  });
});
