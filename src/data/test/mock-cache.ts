import faker from '@faker-js/faker';
import {GetStorage} from '../protocols/cache/get-storage';

export class GetStorageSpy implements GetStorage {
  key: string = '';
  value: any = faker.random.objectElement({keyA: 'valueA', keyB: 42});
  async get(key: string): Promise<any> {
    this.key = key;
    return Promise.resolve(this.value);
  }
}
