import {SetStorage} from '@/data/protocols/cache/set-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorageAdapter implements SetStorage {
  async set(key: string, value: any): Promise<void> {
    AsyncStorage.setItem(key, value);
    Promise.resolve();
  }
}
