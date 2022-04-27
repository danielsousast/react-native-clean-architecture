import {AccountModel} from '../models';

export interface SaveCurrentAccount {
  save: (account: AccountModel) => Promise<void>;
}
