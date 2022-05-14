import {AccountModel} from '@/domain/models';
import {makeLocalStorageAdapter} from '@/main/factories/usecases';

export const setCurrentAccountAdapter = (account?: AccountModel): void => {
  makeLocalStorageAdapter().set('account', account);
};

export const getCurrentAccountAdapter = async (): Promise<AccountModel> => {
  return makeLocalStorageAdapter().get('account');
};
