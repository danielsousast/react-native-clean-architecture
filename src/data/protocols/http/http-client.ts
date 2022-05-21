export enum HttpStatusCode {
  success = 200,
  unauthorized = 401,
  noContent = 204,
  badRequest = 400,
  forbidden = 403,
  internalError = 500,
  notFound = 404,
}

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};

export type HttpRequest = {
  url: string;
  headers?: any;
  method: HttpMethod;
  body?: any;
};

export interface HttpClient<ResponseType = any> {
  request(params: HttpRequest): Promise<HttpResponse<ResponseType>>;
}
