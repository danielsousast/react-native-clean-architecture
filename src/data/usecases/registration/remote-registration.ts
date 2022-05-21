import {HttpClient, HttpStatusCode} from '@/data/protocols/http';
import {EmailInUseError, UnexpectedError} from '@/domain/errors';
import {AccountModel} from '@/domain/models/account-model';
import {Registration, RegistrationParams} from '@/domain/usecases';

export class RemoteRegistration implements Registration {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<AccountModel>,
  ) {}
  async execute(body: RegistrationParams): Promise<AccountModel | undefined> {
    const response = await this.httpClient.request({
      url: this.url,
      body,
      method: 'post',
    });

    switch (response.statusCode) {
      case HttpStatusCode.success:
        return response.body;
      case HttpStatusCode.forbidden:
        throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}
