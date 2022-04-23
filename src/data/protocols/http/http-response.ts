export enum HttpStatusCode {
  success = 200,
  unauthorized = 401,
  noContent = 204,
  badRequest = 400,
  forbidden = 403,
  internalError = 500,
  notFound = 404,
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};
