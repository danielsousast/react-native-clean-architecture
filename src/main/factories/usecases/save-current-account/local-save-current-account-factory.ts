import {LocalSaveCurrentAccount} from '@/data/usecases';
import {SaveCurrentAccount} from '@/domain/usecases';
import {makeLocalStorageAdapter} from '@/main/factories/usecases';

export const makeLocalSaveCurrentAccount = (): SaveCurrentAccount => {
  return new LocalSaveCurrentAccount(makeLocalStorageAdapter());
};
