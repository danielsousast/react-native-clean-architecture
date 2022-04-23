import {
  Authentication,
  AuthenticationParams,
} from '@/domain/usecases/authentication';
import {HttpPostClient} from '@/data/protocols/http/http-post-client';
import {HttpStatusCode} from '@/data/protocols/http/http-response';
import {InvalidCredentialsError} from '@/domain/errors/InvalidCredentialsError';
import {UnexpectedError} from '@/domain/errors/UnexpectedError';
import {AccountModel} from '@/domain/models/account-model';

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<AccountModel>,
  ) {}
  async auth(body: AuthenticationParams): Promise<AccountModel | undefined> {
    const response = await this.httpClient.post({
      url: this.url,
      body,
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
