import {GetStorage} from '@/data/protocols/cache/get-storage';
import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse,
} from '@/data/protocols/http';
import {AccountModel} from '@/domain/models';

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async get(params: HttpGetParams): Promise<HttpResponse> {
    const account: AccountModel = await this.getStorage.get('account');
    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, {
          'x-access-token': account?.accessToken,
        }),
      });
    }
    const response = await this.httpGetClient.get(params);
    return response;
  }
}
