import {RemoteAuthentication} from '@/data/usecases/authentication/remote-authentication';
import {makeAxiosHttpClient} from '@/main/factories/http/axios-http-client-factory';

export const makeRemoteAuthentication = (): RemoteAuthentication => {
  const url = 'http://fordevs.herokuapp.com/api/login';
  const axiosHttpClient = makeAxiosHttpClient();
  return new RemoteAuthentication(url, axiosHttpClient);
};
