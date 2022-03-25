import {HttpPostClient} from '../../protocols/http/http-post-client';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient,
  ) {}
  async auth(): Promise<void> {
    await this.httpClient.post(this.url);
  }
}
