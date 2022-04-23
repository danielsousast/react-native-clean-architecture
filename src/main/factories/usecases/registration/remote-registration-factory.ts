import {RemoteRegistration} from '@/data/usecases/registration/remote-registration';
import {makeAxiosHttpClient} from '@/main/factories/http/axios-http-client-factory';

export const makeRemoteRegistration = (): RemoteRegistration => {
  const url = 'http://fordevs.herokuapp.com/api/signup';
  const axiosHttpClient = makeAxiosHttpClient();
  return new RemoteRegistration(url, axiosHttpClient);
};
