import {SetStorage} from '@/data/protocols/cache/set-storage';
import {SaveAccessToken} from '@/domain/usecases/save-access-token';

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}
  save(accessToken: string) {
    this.setStorage.set('accessToken', accessToken);
    return Promise.resolve();
  }
}
