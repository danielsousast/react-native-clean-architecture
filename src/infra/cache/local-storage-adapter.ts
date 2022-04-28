import {Storage} from '@/data/protocols/cache/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorageAdapter implements Storage {
  set(key: string, value: any): void {
    AsyncStorage.setItem(key, JSON.stringify(value));
  }

  async get(key: string): Promise<any> {
    const response = await AsyncStorage.getItem(key);
    if (response) {
      return await JSON.parse(response);
    }
    return undefined;
  }

  async clear(): Promise<any> {
    await AsyncStorage.clear();
  }
}
