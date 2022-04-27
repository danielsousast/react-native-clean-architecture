import {AccountModel} from '@/domain/models';
import {SaveCurrentAccount} from '@/domain/usecases/save-current-account';

export class SaveCurrentAccountMock implements SaveCurrentAccount {
  account: AccountModel | undefined;
  async save(account: AccountModel) {
    this.account = account;
  }
}
