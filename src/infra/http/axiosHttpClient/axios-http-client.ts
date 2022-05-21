import axios, {AxiosError, AxiosResponse} from 'axios';
import {HttpClient, HttpRequest, HttpResponse} from '@/data/protocols/http';
import {ErrorLog} from '@/lib/ErrorLog';

export class AxiosHttpClient implements HttpClient {
  async request(params: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: params?.url,
        data: params?.body,
        headers: params.headers,
        method: params.method,
      });
    } catch (error) {
      ErrorLog.log('AxiosHttpClient.post', error as Error);
      axiosResponse = (error as AxiosError).response as any;
    }
    return {
      statusCode: axiosResponse?.status,
      body: axiosResponse?.data,
    };
  }
}
