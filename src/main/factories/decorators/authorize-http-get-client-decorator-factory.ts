import {HttpGetClient} from '@/data/protocols/http';
import {AuthorizeHttpGetClientDecorator} from '@/main/decorators';
import {makeAxiosHttpClient} from '@/main/factories/http';
import {makeLocalStorageAdapter} from '@/main/factories/usecases';

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient(),
  );
};
