import {
  Authentication,
  AuthenticationParams,
} from '@/domain/usecases/authentication';
import {InvalidCredentialsError} from '@/domain/errors/InvalidCredentialsError';
import {UnexpectedError} from '@/domain/errors/UnexpectedError';
import {AccountModel} from '@/domain/models/account-model';
import {HttpClient, HttpStatusCode} from '@/data/protocols/http';

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<AccountModel>,
  ) {}
  async auth(body: AuthenticationParams): Promise<AccountModel | undefined> {
    const response = await this.httpClient.request({
      url: this.url,
      body,
      method: 'post',
    });

    switch (response.statusCode) {
      case HttpStatusCode.success:
        return response.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
