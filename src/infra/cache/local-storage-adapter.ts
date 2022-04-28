import {SetStorage} from '@/data/protocols/cache/set-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorageAdapter implements SetStorage {
  set(key: string, value: any): void {
    AsyncStorage.setItem(key, value);
  }
}
