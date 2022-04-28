import {UnexpectedError} from '@/domain/errors';
import {AccountModel} from '@/domain/models';
import {makeLocalStorageAdapter} from '@/main/factories/usecases';

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError();
  }
  makeLocalStorageAdapter().set('account', JSON.stringify(account));
};
