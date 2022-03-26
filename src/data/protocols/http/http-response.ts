export enum HttpStatusCode {
  success = 200,
  unauthorized = 401,
  noContent = 204,
  badRequest = 400,
  internalError = 500,
  notFound = 404,
}

export type HttpResponse = {
  statusCode: HttpStatusCode;
  body?: any;
};
