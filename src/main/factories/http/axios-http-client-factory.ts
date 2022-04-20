import {AxiosHttpClient} from '@/infra/http/axiosHttpClient/axios-http-client';

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};
