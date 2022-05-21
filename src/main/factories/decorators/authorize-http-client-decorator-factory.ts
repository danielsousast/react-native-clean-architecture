import {HttpClient} from '@/data/protocols/http';
import {AuthorizeHttpClientDecorator} from '@/main/decorators';
import {makeAxiosHttpClient} from '@/main/factories/http';
import {makeLocalStorageAdapter} from '@/main/factories/usecases';

export const makeAuthorizeHttpClientDecorator = (): HttpClient => {
  return new AuthorizeHttpClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient(),
  );
};
