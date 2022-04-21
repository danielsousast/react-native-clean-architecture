import {SaveAccessToken} from '@/domain/usecases/save-access-token';

export class SaveAccessTokenMock implements SaveAccessToken {
  accessToken: string = null;
  async save(accessToken: string) {
    this.accessToken = accessToken;
  }
}
