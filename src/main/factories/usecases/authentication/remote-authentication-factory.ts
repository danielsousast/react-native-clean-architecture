import {RemoteAuthentication} from '@/data/usecases';
import {makeAxiosHttpClient} from '@/main/factories/http';

export const makeRemoteAuthentication = (): RemoteAuthentication => {
  const url = 'http://fordevs.herokuapp.com/api/login';
  const axiosHttpClient = makeAxiosHttpClient();
  return new RemoteAuthentication(url, axiosHttpClient);
};
