import axios, {AxiosError, AxiosResponse} from 'axios';
import {HttpGetParams} from '@/data/protocols/http';
import {
  HttpPostClient,
  HttpPostParams,
} from '@/data/protocols/http/http-post-client';
import {HttpResponse} from '@/data/protocols/http/http-response';
import {ErrorLog} from '@/lib/ErrorLog';

export class AxiosHttpClient implements HttpPostClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.post(params.url, params.body);
    } catch (error) {
      ErrorLog.log('AxiosHttpClient.post', error as Error);
      axiosResponse = (error as AxiosError).response as any;
    }
    return this.adapt(axiosResponse);
  }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.get(params.url, {headers: params.headers});
    } catch (error) {
      ErrorLog.log('AxiosHttpClient.get', error as Error);
      axiosResponse = (error as AxiosError).response as any;
    }
    return this.adapt(axiosResponse);
  }

  private adapt(axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse?.status,
      body: axiosResponse?.data,
    };
  }
}
