import {LocalSaveAccessToken} from '@/data/usecases';
import {SaveAccessToken} from '@/domain/usecases';
import {makeLocalStorageAdapter} from '@/main/factories/usecases';

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter());
};
