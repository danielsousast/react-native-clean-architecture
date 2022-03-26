import {AuthenticationParams} from '@/domain/usecases/authentication';
import {HttpPostClient} from '@/data/protocols/http/http-post-client';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient,
  ) {}
  async auth(body: AuthenticationParams): Promise<void> {
    await this.httpClient.post({
      url: this.url,
      body,
    });
  }
}
