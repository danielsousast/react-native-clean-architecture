import {SetStorage} from '@/data/protocols/cache/set-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorageAdapter implements SetStorage {
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
}
