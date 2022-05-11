import faker from '@faker-js/faker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalStorageAdapter} from './local-storage-adapter';

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};

describe('LocalStorageAdapter', () => {
  test('should call AsyncStorage set with correct values', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement({key: 'value'});
    sut.set(key, value);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  test('should call AsyncStorage clear if value is null', () => {
    const sut = makeSut();
    const key = faker.database.column();
    sut.set(key, null);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test('should call AsyncStorage get with correct value', async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement({});
    const getItemSpy = jest
      .spyOn(AsyncStorage, 'getItem')
      .mockResolvedValueOnce(JSON.stringify(value));
    const obj = await sut.get(key);
    expect(obj).toEqual(value);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });
});
