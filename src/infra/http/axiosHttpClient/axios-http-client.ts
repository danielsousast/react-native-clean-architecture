import {
  HttpPostClient,
  HttpPostParams,
} from '@/data/protocols/http/http-post-client';
import {HttpResponse} from '@/data/protocols/http/http-response';
import axios, {AxiosError} from 'axios';

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    try {
      const response = await axios.post(params.url, params.body);
      return {
        statusCode: response.status,
        body: response.data,
      };
    } catch (error) {
      return {
        statusCode: (error as AxiosError).response?.status || 500,
        body: (error as AxiosError).response?.data,
      };
    }
  }
}
