import {SetStorage} from '@/data/protocols/cache/set-storage';
import {AccountModel} from '@/domain/models';
import {SaveCurrentAccount} from '@/domain/usecases/save-current-account';

export class LocalSaveCurrentAccount implements SaveCurrentAccount {
  constructor(private readonly setStorage: SetStorage) {}
  save(account: AccountModel) {
    this.setStorage.set('account', JSON.stringify(account));
    return Promise.resolve();
  }
}
